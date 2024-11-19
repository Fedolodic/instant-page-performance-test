import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestRunnerService } from './test-runner.service';
import { Subject, takeUntil } from 'rxjs';
import { TestResultsComponent } from './test-results/test-results.component';

@Component({
  selector: 'app-performance-test',
  standalone: true,
  imports: [CommonModule, TestResultsComponent],
  template: `
    <div class="container">
      <h2>Performance Test Runner</h2>

      <div class="controls">
        <button [disabled]="isRunning" (click)="runTest(false)">
          Run Test without instant.page
        </button>
        <button [disabled]="isRunning" (click)="runTest(true)">
          Run Test with instant.page
        </button>
      </div>

      <div class="status" *ngIf="isRunning">Running test...</div>

      <div class="error" *ngIf="error">
        {{ error }}
      </div>

      <div class="current-results" *ngIf="testResults">
        <h3>Current Test Results</h3>

        <div class="summary">
          <h4>Summary</h4>
          <p>
            Average Navigation Time:
            {{ formatDuration(testResults.summary.averageTime) }}
          </p>
          <p>
            Total Test Duration:
            {{ formatDuration(testResults.summary.totalTime) }}
          </p>
          <p>Successful Navigations: {{ testResults.summary.successCount }}</p>
        </div>

        <div class="metrics">
          <h4>Detailed Metrics</h4>
          <div class="metric-item" *ngFor="let metric of testResults.metrics">
            <div class="route-header">
              <strong>{{ metric.route }}</strong>
            </div>
            <div class="metric-details">
              <div class="metric">
                <span class="label">Navigation Time:</span>
                <span class="value">{{ formatDuration(metric.duration) }}</span>
              </div>
              <div class="metric" *ngIf="metric.firstContentfulPaint">
                <span class="label">First Contentful Paint:</span>
                <span class="value">{{
                  formatDuration(metric.firstContentfulPaint)
                }}</span>
              </div>
              <div class="metric" *ngIf="metric.largestContentfulPaint">
                <span class="label">Largest Contentful Paint:</span>
                <span class="value">{{
                  formatDuration(metric.largestContentfulPaint)
                }}</span>
              </div>
              <div class="metric" *ngIf="metric.timeToInteractive">
                <span class="label">Time to Interactive:</span>
                <span class="value">{{
                  formatDuration(metric.timeToInteractive)
                }}</span>
              </div>
              <div
                class="metric"
                *ngIf="metric.cumulativeLayoutShift !== undefined">
                <span class="label">Cumulative Layout Shift:</span>
                <span class="value">{{
                  metric.cumulativeLayoutShift.toFixed(3)
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <app-test-results></app-test-results>
    </div>
  `,
  styles: [
    `
      .container {
        display: grid;
        gap: 2rem;
        max-width: 1200px;
        margin: 40px auto;
        padding: 2rem;
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      h2 {
        margin: 0;
        text-align: center;
      }

      .controls {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        justify-items: center;
      }

      .controls button {
        width: 100%;
        max-width: 250px;
      }

      .status {
        text-align: center;
        font-style: italic;
        color: #666;
      }

      .error {
        padding: 1rem;
        background-color: #fee;
        border-left: 4px solid #f66;
        color: #c33;
      }

      .current-results {
        display: grid;
        gap: 1.5rem;
      }

      .summary {
        display: grid;
        gap: 0.5rem;
        padding: 1.5rem;
        background: white;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      .summary h4 {
        margin: 0;
        color: #2c3e50;
      }

      .metrics {
        display: grid;
        gap: 1rem;
      }

      .metrics h4 {
        margin: 0;
      }

      .metric-item {
        display: grid;
        gap: 0.5rem;
        padding: 1rem;
        background: white;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      .route-header {
        font-size: 1.1em;
        color: #2c3e50;
      }

      .metric-details {
        display: grid;
        gap: 0.5rem;
        padding-left: 1rem;
      }

      .metric {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 1rem;
        align-items: center;
      }

      .label {
        color: #666;
      }

      .value {
        font-family: monospace;
        color: #2c3e50;
      }

      @media (max-width: 768px) {
        .container {
          margin: 20px;
          padding: 1rem;
        }

        .metric {
          grid-template-columns: 1fr;
          gap: 0.25rem;
        }
      }
    `,
  ],
})
export class PerformanceTestComponent implements OnInit, OnDestroy {
  testResults: any = null;
  isRunning = false;
  error: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(private testRunner: TestRunnerService) {
    console.log('PerformanceTestComponent initialized');
  }

  ngOnInit() {
    // Subscribe to test completion events
    this.testRunner.testResults$
      .pipe(takeUntil(this.destroy$))
      .subscribe(results => {
        this.testResults = results;
        this.isRunning = false;
      });

    // Subscribe to errors
    this.testRunner.error$.pipe(takeUntil(this.destroy$)).subscribe(error => {
      this.error = error;
      this.isRunning = false;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async runTest(withInstantPage: boolean) {
    this.isRunning = true;
    this.error = null;
    this.testResults = null;

    console.log(
      `Starting performance test with instant.page: ${withInstantPage}`
    );
    try {
      await this.testRunner.runTest(withInstantPage);
      console.log('Test started successfully');
    } catch (error) {
      console.error('Failed to start test:', error);
      this.error =
        error instanceof Error ? error.message : 'Unknown error occurred';
      this.isRunning = false;
    }
  }

  formatDuration(ms: number): string {
    return `${ms.toFixed(2)}ms`;
  }

  calculateAverage(metrics: any[]): number {
    if (!metrics || metrics.length === 0) {
      return 0;
    }
    const sum = metrics.reduce((acc, curr) => acc + curr.duration, 0);
    return sum / metrics.length;
  }
}
