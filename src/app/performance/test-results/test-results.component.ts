import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TestStorageService } from '../test-storage.service';
import { StoredTestRun } from '../test-storage.service';
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale';

@Component({
  selector: 'app-test-results',
  standalone: true,
  imports: [CommonModule, ChartModule, TableModule, ButtonModule, CardModule],
  template: `
    <div class="results-container">
      <p-card>
        <h3>Test Results History</h3>

        <div class="chart-container" *ngIf="chartData">
          <p-chart
            type="line"
            [data]="chartData"
            [options]="chartOptions"></p-chart>
        </div>

        <div class="table-container">
          <p-table
            [value]="testResults"
            [tableStyle]="{ 'min-width': '50rem' }">
            <ng-template pTemplate="header">
              <tr>
                <th>Date</th>
                <th>instant.page</th>
                <th>Avg. Navigation (ms)</th>
                <th>Total Time (ms)</th>
                <th>Success Count</th>
              </tr>
            </ng-template>
            <ng-template pTemplate="body" let-result>
              <tr>
                <td>{{ result.timestamp | date: 'medium' }}</td>
                <td>{{ result.withInstantPage ? 'Enabled' : 'Disabled' }}</td>
                <td>{{ result.summary.averageTime.toFixed(2) }}</td>
                <td>{{ result.summary.totalTime.toFixed(2) }}</td>
                <td>{{ result.summary.successCount }}</td>
              </tr>
            </ng-template>
          </p-table>
        </div>

        <div class="controls">
          <p-button
            label="Clear History"
            severity="danger"
            (onClick)="clearResults()"></p-button>
        </div>
      </p-card>
    </div>
  `,
  styles: [
    `
      .results-container {
        display: grid;
        gap: 2rem;
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
      }

      :host ::ng-deep {
        .p-card {
          .p-card-body {
            display: grid;
            gap: 2rem;
          }

          .p-card-content {
            display: grid;
            gap: 2rem;
            padding: 0;
          }

          h3 {
            margin: 0;
            text-align: center;
            color: #2c3e50;
          }
        }

        .p-datatable {
          .p-datatable-header {
            background: #f8f9fa;
            border: none;
            padding: 1rem;
          }

          .p-datatable-thead > tr > th {
            background: #f8f9fa;
            color: #2c3e50;
            border: none;
            border-bottom: 2px solid #e9ecef;
            padding: 1rem;
          }

          .p-datatable-tbody > tr > td {
            border: none;
            border-bottom: 1px solid #e9ecef;
            padding: 1rem;
          }

          .p-datatable-tbody > tr:nth-child(even) {
            background: #f8f9fa;
          }
        }
      }

      .chart-container {
        position: relative;
        display: grid;
        height: 400px;
        width: 100%;
        background: white;
        border-radius: 8px;
        padding: 1rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

        ::ng-deep {
          p-chart {
            position: absolute;
            top: 1rem;
            left: 1rem;
            right: 1rem;
            bottom: 1rem;

            > div {
              position: absolute !important;
              width: 100% !important;
              height: 100% !important;
            }

            canvas {
              position: absolute !important;
              width: 100% !important;
              height: 100% !important;
            }
          }
        }
      }

      .table-container {
        display: grid;
        background: white;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }

      .controls {
        display: grid;
        justify-content: end;
      }

      @media (max-width: 768px) {
        .results-container {
          margin: 0;
          padding: 1rem;
        }

        :host ::ng-deep {
          .p-datatable {
            .p-datatable-thead > tr > th,
            .p-datatable-tbody > tr > td {
              padding: 0.5rem;
            }
          }
        }
      }
    `,
  ],
})
export class TestResultsComponent implements OnInit {
  testResults: StoredTestRun[] = [];
  chartData: any;
  chartOptions: any;

  constructor(private storage: TestStorageService) {}

  ngOnInit() {
    this.storage.storedResults$.subscribe(results => {
      this.testResults = results;
      this.updateChart();
    });

    this.initializeChartOptions();
  }

  private updateChart() {
    const withInstantPage = this.testResults
      .filter(result => result.withInstantPage)
      .map(result => ({
        x: new Date(result.timestamp),
        y: result.summary.averageTime,
      }))
      .sort((a, b) => a.x.getTime() - b.x.getTime());

    const withoutInstantPage = this.testResults
      .filter(result => !result.withInstantPage)
      .map(result => ({
        x: new Date(result.timestamp),
        y: result.summary.averageTime,
      }))
      .sort((a, b) => a.x.getTime() - b.x.getTime());

    this.chartData = {
      datasets: [
        {
          label: 'With instant.page',
          data: withInstantPage,
          borderColor: '#2196F3',
          tension: 0.4,
        },
        {
          label: 'Without instant.page',
          data: withoutInstantPage,
          borderColor: '#FF9800',
          tension: 0.4,
        },
      ],
    };
  }

  private initializeChartOptions() {
    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057',
          },
        },
        title: {
          display: true,
          text: 'Average Navigation Time Over Time',
          color: '#495057',
          font: {
            size: 16,
          },
        },
      },
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'minute',
            displayFormats: {
              minute: 'HH:mm:ss',
            },
            tooltipFormat: 'PPpp',
          },
          title: {
            display: true,
            text: 'Time',
          },
          adapters: {
            date: {
              locale: enUS,
            },
          },
        },
        y: {
          title: {
            display: true,
            text: 'Navigation Time (ms)',
          },
          beginAtZero: true,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      resizeDelay: 0,
      animation: {
        duration: 0,
      },
    };
  }

  clearResults() {
    this.storage.clearStoredResults();
  }
}
