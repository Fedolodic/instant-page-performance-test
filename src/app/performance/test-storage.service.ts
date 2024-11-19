import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TestResults } from './test-runner.service';

export interface StoredTestRun extends TestResults {
  id: string;
  timestamp: number;
  withInstantPage: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TestStorageService {
  private readonly STORAGE_KEY = 'instant_page_test_results';
  private storedResults = new BehaviorSubject<StoredTestRun[]>([]);

  storedResults$ = this.storedResults.asObservable();

  constructor() {
    this.loadFromStorage();
  }

  saveTestRun(results: TestResults, withInstantPage: boolean): void {
    const storedRun: StoredTestRun = {
      ...results,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      withInstantPage,
    };

    const currentResults = this.getStoredResults();
    const updatedResults = [storedRun, ...currentResults];

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedResults));
    this.storedResults.next(updatedResults);
  }

  getStoredResults(): StoredTestRun[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  clearStoredResults(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.storedResults.next([]);
  }

  private loadFromStorage(): void {
    this.storedResults.next(this.getStoredResults());
  }
}
