# CodePet Games

A collection of fun, engaging browser games built with Phaser 3.

## Games

### Space Clicker
- A space-themed clicker game where you collect resources from celestial objects
- Upgrade your click power and automate collection
- Features a clean, modern UI with smooth animations

### Asteroids
- Classic arcade-style game where you control a spaceship and destroy asteroids
- Avoid collisions and shoot lasers to break down space rocks
- Features smooth controls and progressively challenging gameplay

### Roguelike
- Dungeon exploration game with procedurally generated levels
- Battle enemies, collect power-ups, and find your way through the maze
- Pixel art style with top-down perspective

## Project Structure

```
codepet-games/
├── public/                    # Static files for the main website
│   ├── index.html            # Main landing page
│   ├── styles/               # Global styles
│   ├── assets/               # Shared assets
│   │   └── images/           # Common images
│   │       └── logo.png      # Site logo
│   │
│   └── games/                # Individual game directories
│       ├── space-clicker/    # Space Clicker game
│       │   ├── index.html
│       │   ├── src/
│       │   │   ├── js/
│       │   │   │   ├── scenes/
│       │   │   │   └── game.js
│       │   │   └── styles/
│       │   │       └── main.css
│       │   └── assets/
│       │
│       ├── asteroids/        # Asteroids game
│       │   ├── index.html
│       │   ├── src/
│       │   │   ├── js/
│       │   │   │   ├── scenes/
│       │   │   │   └── game.js
│       │   │   └── styles/
│       │   └── assets/
│       │
│       └── roguelike/        # Roguelike game
│           ├── index.html
│           ├── src/
│           │   └── js/
│           │       ├── scenes/
│           │       └── game.js
│           └── assets/
│
└── README.md                 # Project documentation
```

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/codepet-games.git
cd codepet-games
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