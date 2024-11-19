import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page1',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <h1>Page 1</h1>
      <p>This is a test page with some content to simulate a real page load.</p>
      <div class="content">
        <div class="card" *ngFor="let i of cards">
          <h3>Card {{ i + 1 }}</h3>
          <p>Some content for card {{ i + 1 }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .page {
        padding: 20px;
      }
      .content {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 20px;
        margin-top: 20px;
      }
      .card {
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
      }
    `,
  ],
})
export class Page1Component {
  cards = Array(20)
    .fill(0)
    .map((_, i) => i);
}
