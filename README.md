# Vibe Games

A collection of fun, engaging browser games built with Phaser 3.

## Games

### Space Clicker
- A space-themed clicker game where you collect resources from celestial objects
- Upgrade your click power and automate collection
- Features a clean, modern UI with smooth animations

## Project Structure

```
vibe-game/
├── public/                    # Static files for the main website
│   ├── index.html            # Main landing page
│   ├── styles/               # Global styles
│   └── assets/               # Shared assets
│
├── games/                    # Individual game directories
│   ├── space-clicker/       # Space Clicker game
│   │   ├── src/
│   │   │   ├── js/
│   │   │   │   ├── scenes/
│   │   │   │   └── game.js
│   │   │   └── styles/
│   │   ├── assets/
│   │   └── index.html
│   │
│   └── [future-game]/       # Template for future games
│
└── README.md                 # Project documentation
```

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/vibe-game.git
cd vibe-game
```

2. Open the project in your browser:
- For local development, you can use a simple HTTP server
- For production, deploy to a static hosting service like GitHub Pages

## Development

Each game is self-contained in its own directory under `games/`. To add a new game:

1. Create a new directory under `games/`
2. Follow the structure of existing games
3. Add a link to the game on the main landing page

## Technologies Used

- Phaser 3 for game development
- HTML5 and CSS3 for UI
- JavaScript for game logic

## License

MIT License - feel free to use this project as a template for your own games!