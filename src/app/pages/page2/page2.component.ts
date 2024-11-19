import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page2',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <h1>Page 2</h1>
      <p>Another test page with different content structure.</p>
      <div class="content">
        <div class="article" *ngFor="let i of articles">
          <h2>Article {{ i + 1 }}</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button>Read more</button>
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
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-top: 20px;
      }
      .article {
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
        background: #f9f9f9;
      }
      button {
        margin-top: 10px;
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        background: #007bff;
        color: white;
        cursor: pointer;
      }
    `,
  ],
})
export class Page2Component {
  articles = Array(15)
    .fill(0)
    .map((_, i) => i);
}
