import { Routes } from '@angular/router';
import { PerformanceTestComponent } from './performance/performance-test.component';
import { Page1Component } from './pages/page1/page1.component';
import { Page2Component } from './pages/page2/page2.component';
import { Page3Component } from './pages/page3/page3.component';

export const routes: Routes = [
  { path: '', component: PerformanceTestComponent },
  {
    path: 'page1',
    loadComponent: () =>
      import('./pages/page1/page1.component').then(m => m.Page1Component),
  },
  {
    path: 'page2',
    loadComponent: () =>
      import('./pages/page2/page2.component').then(m => m.Page2Component),
  },
  {
    path: 'page3',
    loadComponent: () =>
      import('./pages/page3/page3.component').then(m => m.Page3Component),
  },
];
