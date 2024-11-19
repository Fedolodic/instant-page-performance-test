# 🚀 Instant Page Performance Test

> An experimental Angular application that measures and visualizes the impact of instant.page preloading on web performance.

<div align="center">

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FFedolodic%2Finstant-page-performance-test)

🌐 **[Live Demo](https://instant-page-performance-test-9uf9sdvvk-davidmtz00s-projects.vercel.app)** | [Documentation](#documentation) | [Contributing](#contributing)

</div>

## 🎯 Try It Out

Visit our **[Live Demo](https://instant-page-performance-test-9uf9sdvvk-davidmtz00s-projects.vercel.app)** to experience:
- Real-time performance comparisons
- Interactive 3D visualizations
- Instant.page optimization effects

## 📊 Performance Testing Dashboard

This project provides a novel approach to measuring the effectiveness of instant.page preloading:

- **Real-time Performance Metrics** - Measure and compare navigation times with and without instant.page
- **Interactive 3D Visualizations** - Beautiful Three.js powered representations of performance data
- **Animated Results** - GSAP-powered animations showing performance improvements
- **Experimental Features** - Novel approaches to performance measurement and visualization

## 🎯 Key Features

### Performance Testing
- ⚡ Instant.page integration testing
- 📊 Real-time performance metrics
- 🔄 Automated test sequences
- 📱 Mobile and desktop testing
- 🧪 A/B testing capabilities

### Metrics Tracked
- ⏱️ Navigation Duration
- 🎨 First Contentful Paint (FCP)
- 🖥️ Time to Interactive (TTI)
- 🎭 Largest Contentful Paint (LCP)
- 👆 First Input Delay (FID)
- 📏 Cumulative Layout Shift (CLS)

### Visualization & UI
- 📈 Interactive Chart.js graphs
- 🌟 Three.js 3D performance visualizations
- ✨ GSAP-powered animations
- 🎨 PrimeNG UI components
- 📱 Responsive design

## 🛠️ Technical Architecture

### Frontend Stack
- **Framework**: Angular 18+
- **UI Library**: PrimeNG
- **Styling**: SCSS with CSS Variables
- **State Management**: RxJS
- **Animations**: GSAP
- **3D Graphics**: Three.js
- **Charts**: Chart.js
- **Performance**: instant.page

### Build & Development
- **Language**: TypeScript 5.5+
- **Build Tool**: Angular CLI
- **Package Manager**: npm
- **Deployment**: Vercel
- **Code Quality**: ESLint + Prettier

## 📚 Documentation

### Project Structure
```
instant-page-performance-test/
├── src/
│   ├── app/
│   │   ├── components/         # UI components
│   │   ├── performance/        # Performance testing logic
│   │   ├── visualizations/     # Charts and 3D visualizations
│   │   └── animations/         # GSAP animations
│   ├── assets/                 # Static assets
│   └── styles/                 # Global styles
├── vercel.json                 # Vercel configuration
└── angular.json                # Angular configuration
```

### Performance Testing Flow
1. 🏁 User initiates test
2. 📊 System measures baseline performance
3. ⚡ Enables instant.page
4. 📈 Measures optimized performance
5. 🎨 Visualizes results with animations

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/Fedolodic/instant-page-performance-test.git

# Install dependencies
npm install

# Start development server
npm start
```

Visit `http://localhost:4200` in your browser.

## 🎮 Usage

1. 🌐 Navigate to the application
2. 🔄 Click "Run Test without instant.page"
3. ⚡ Click "Run Test with instant.page"
4. 📊 View the performance comparison
5. 🎨 Explore interactive visualizations

## 🔧 Development Commands

```bash
# Run tests
npm test

# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

## 🌟 Experimental Features

- **3D Performance Landscapes**: Novel Three.js visualizations mapping performance metrics to 3D terrain
- **Animated Metric Transitions**: GSAP-powered animations showing performance changes over time
- **Real-time Performance Heatmaps**: Visual representation of performance hotspots
- **Interactive Performance Replay**: Record and replay user sessions with performance overlay

## 🎨 UI/UX Features

### Animations
- 🌊 Fluid page transitions
- ✨ Particle effects for loading states
- 📊 Animated chart updates
- 🎭 3D performance visualizations
- 🌈 Dynamic color themes

### Interactive Elements
- 🔄 Draggable charts
- 🎚️ Interactive filters
- 🎯 Clickable performance hotspots
- 🎨 Theme switcher
- 📱 Responsive layouts

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Angular team for the amazing framework
- PrimeNG for beautiful UI components
- Chart.js and Three.js communities
- instant.page for the preloading magic
- GSAP for smooth animations

---

<div align="center">
Made with ❤️ by David Martinez
</div>
