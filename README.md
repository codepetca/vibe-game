# Space Clicker Game

A fun and addictive space-themed clicker game built with Phaser 3.

## Features

- Simple and engaging gameplay
- Resource collection mechanics
- Upgrade system
- Dark mode support
- Responsive design
- High score tracking

## How to Play

1. Click on space objects (planets, asteroids, stars) to collect resources
2. Use collected resources to purchase upgrades:
   - Upgrade Click Power: Increases resources collected per click
   - Auto Collector: Automatically collects resources periodically
3. Try to achieve the highest score possible!

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/space-clicker.git
   cd space-clicker
   ```

2. Install dependencies and download game assets:
   ```
   npm run setup
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:8080`

## Development

This game is built with Phaser 3, a popular HTML5 game framework. The project structure is as follows:

```
/
├── index.html              # Main HTML file
├── package.json            # Project dependencies and scripts
├── download-assets.js      # Script to download placeholder assets
├── assets/                 # Game assets
│   └── images/             # Image assets
└── src/                    # Source code
    └── js/                 # JavaScript files
        ├── game.js         # Main game initialization
        ├── dark-mode.js    # Dark mode functionality
        └── scenes/         # Phaser scenes
            ├── BootScene.js       # Initial loading scene
            ├── PreloadScene.js    # Asset loading scene
            ├── MenuScene.js       # Main menu scene
            └── GameScene.js       # Main game scene
```

## Deployment

The game is configured for deployment on GitHub Pages. Simply push your changes to the main branch, and GitHub Actions will automatically deploy the game to the gh-pages branch.

## License

MIT License