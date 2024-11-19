import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page3',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <h1>Page 3</h1>
      <p>A third test page with a different layout.</p>
      <div class="content">
        <div class="sidebar">
          <div class="menu-item" *ngFor="let i of menuItems">
            Menu Item {{ i + 1 }}
          </div>
        </div>
        <div class="main-content">
          <div class="section" *ngFor="let i of sections">
            <h2>Section {{ i + 1 }}</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>
            <div class="image-placeholder"></div>
          </div>
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
        grid-template-columns: 250px 1fr;
        gap: 30px;
        margin-top: 20px;
      }
      .sidebar {
        border-right: 1px solid #ddd;
        padding-right: 20px;
      }
      .menu-item {
        padding: 10px;
        margin: 5px 0;
        background: #f5f5f5;
        border-radius: 4px;
        cursor: pointer;
      }
      .menu-item:hover {
        background: #e9e9e9;
      }
      .section {
        margin-bottom: 30px;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
      }
      .image-placeholder {
        width: 100%;
        height: 200px;
        background: #f0f0f0;
        margin-top: 15px;
        border-radius: 4px;
      }
    `,
  ],
})
export class Page3Component {
  menuItems = Array(10)
    .fill(0)
    .map((_, i) => i);
  sections = Array(5)
    .fill(0)
    .map((_, i) => i);
}
