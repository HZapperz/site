# Zapp Studios Landing Page 🔥

A fiery, gamer-inspired landing page for Zapp Studios built with React Native Web.

## Features

- 🎮 Gamer-aesthetic design with fire theme
- 📱 Fully responsive (mobile & desktop)
- ⚡ Smooth animations and interactions
- 🔥 Fire particle effects and glowing elements
- 📝 Contact form with validation
- 💼 Job board section
- 🚀 Project showcase with hover effects

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd ZappStudios
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
ZappStudios/
├── public/
│   ├── index.html         # HTML template with fonts
│   └── manifest.json      # PWA manifest
├── src/
│   ├── components/
│   │   ├── NavigationBar.js    # Fixed navigation
│   │   ├── HeroSection.js      # Hero banner with CTA
│   │   ├── AboutSection.js     # About the company
│   │   ├── ProjectsSection.js  # Project showcase
│   │   ├── HowItWorksSection.js # Process steps
│   │   ├── HiringSection.js    # Job listings
│   │   ├── ContactSection.js   # Contact form
│   │   └── Footer.js           # Footer
│   ├── App.js            # Main app component
│   └── index.js          # Entry point
├── package.json
└── README.md
```

## Customization

### Colors
The fire theme uses these main colors:
- Primary Fire: `#FF4500` (OrangeRed)
- Deep Red: `#8B0000`
- Orange Accent: `#FFA500`
- Gold Highlight: `#FFD700`
- Background: `#000000` (Black)

### Fonts
- Headers: 'Press Start 2P' (retro gaming font)
- Body: 'Orbitron' (futuristic font)

### Content
Update the following in each component:
- Company information in `AboutSection.js`
- Project data in `ProjectsSection.js`
- Job listings in `HiringSection.js`
- Contact info in `ContactSection.js`

### Links
Replace placeholder URLs:
- Calendly link in `HeroSection.js`
- Wellfound job links in `HiringSection.js`

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Deployment

The built app can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Firebase Hosting

## Technologies Used

- React Native Web
- React 18
- Animated API for animations
- StyleSheet for responsive design
- Custom fire particle effects

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2025 Zapp Studios - All Rights Reserved

---

🔥 **Built with passion by Zapp Studios** 🔥