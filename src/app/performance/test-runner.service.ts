import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { TestStorageService } from './test-storage.service';

// Add types for web performance API
interface PerformanceLayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

export interface NavigationMetric {
  route: string;
  duration: number;
  timestamp: number;
  firstContentfulPaint?: number;
  timeToInteractive?: number;
  largestContentfulPaint?: number;
  firstInputDelay?: number;
  cumulativeLayoutShift?: number;
}

export interface TestResults {
  metrics: NavigationMetric[];
  summary: {
    totalTime: number;
    averageTime: number;
    successCount: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class TestRunnerService {
  private readonly ROUTES = ['/page1', '/page2', '/page3', '/'];
  private readonly instantPageScript = `
    let t;const e=document.createElement("script");e.src="/assets/instantpage.js",e.type="module",document.head.appendChild(e);
  `;

  private results = new BehaviorSubject<TestResults | null>(null);
  private errorSubject = new BehaviorSubject<string | null>(null);

  testResults$ = this.results.asObservable();
  error$ = this.errorSubject.asObservable();

  constructor(
    private router: Router,
    private storage: TestStorageService
  ) {}

  private clearError() {
    this.errorSubject.next(null);
  }

  private setError(error: string) {
    this.errorSubject.next(error);
  }

  private async loadInstantPage(): Promise<void> {
    console.log('instant.page is embedded in index.html');
    return Promise.resolve();
  }

  private cleanupInstantPage() {
    console.log('No cleanup needed for embedded instant.page');
  }

  async runTest(withInstantPage: boolean): Promise<void> {
    console.log('Starting test with instant.page:', withInstantPage);
    this.clearError();
    this.results.next(null);

    try {
      if (withInstantPage) {
        await this.loadInstantPage();
      } else {
        this.cleanupInstantPage();
      }

      const metrics = await this.runNavigationTest();
      const summary = this.calculateSummary(metrics);
      const results = { metrics, summary };

      this.results.next(results);
      this.storage.saveTestRun(results, withInstantPage);
    } catch (error) {
      console.error('Test failed:', error);
      this.setError(
        error instanceof Error ? error.message : 'Unknown error occurred'
      );
      throw error;
    }
  }

  private async runNavigationTest(): Promise<NavigationMetric[]> {
    console.log('Starting navigation test...');
    const metrics: NavigationMetric[] = [];

    for (const route of this.ROUTES) {
      try {
        console.log(`Starting navigation to ${route}...`);
        const start = performance.now();

        // Clear performance entries before navigation
        performance.clearResourceTimings();
        performance.clearMarks();
        performance.clearMeasures();

        await this.router.navigateByUrl(route);
        const duration = performance.now() - start;

        // Collect Web Vitals metrics
        const perfEntries = performance.getEntriesByType('paint');
        const fcp = perfEntries.find(
          entry => entry.name === 'first-contentful-paint'
        )?.startTime;
        const lcp = await this.getLargestContentfulPaint();
        const cls = await this.getCumulativeLayoutShift();
        const tti = await this.getTimeToInteractive();

        console.log(`Navigation to ${route} completed in ${duration}ms`);

        metrics.push({
          route,
          duration,
          timestamp: Date.now(),
          firstContentfulPaint: fcp,
          largestContentfulPaint: lcp,
          timeToInteractive: tti,
          cumulativeLayoutShift: cls,
        });

        console.log(`Successfully navigated to ${route}`);

        // Add a small delay between navigations
        await new Promise(resolve => setTimeout(resolve, 500)); // Increased delay to ensure metrics are collected
      } catch (error) {
        console.error(`Failed to navigate to ${route}:`, error);
        throw new Error(`Navigation to ${route} failed`);
      }
    }

    return metrics;
  }

  private async getLargestContentfulPaint(): Promise<number | undefined> {
    return new Promise(resolve => {
      let lcp: number | undefined;

      new PerformanceObserver(entryList => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        lcp = lastEntry?.startTime;
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // Resolve after a short delay to allow for LCP calculation
      setTimeout(() => resolve(lcp), 100);
    });
  }

  private async getCumulativeLayoutShift(): Promise<number | undefined> {
    return new Promise(resolve => {
      let cls = 0;

      new PerformanceObserver(entryList => {
        for (const entry of entryList.getEntries()) {
          // Type assertion for LayoutShift entry
          const layoutShift = entry as PerformanceLayoutShift;
          if (!layoutShift.hadRecentInput) {
            cls += layoutShift.value;
          }
        }
      }).observe({ entryTypes: ['layout-shift'] });

      setTimeout(() => resolve(cls), 100);
    });
  }

  private async getTimeToInteractive(): Promise<number | undefined> {
    return new Promise(resolve => {
      const tti = performance.now();
      resolve(tti);
    });
  }

  private calculateSummary(metrics: NavigationMetric[]) {
    const totalTime = metrics.reduce((sum, metric) => sum + metric.duration, 0);
    return {
      totalTime,
      averageTime: totalTime / metrics.length,
      successCount: metrics.length,
    };
  }
}
