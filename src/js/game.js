// Game configuration
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 650,
    parent: 'game-container',
    backgroundColor: '#1a1a2e',
    scene: [BootScene, PreloadScene, MenuScene, GameScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

// Create the game instance
const game = new Phaser.Game(config);

// Global game settings
window.gameSettings = {
    resources: 0,
    clickPower: 1,
    autoCollectors: 0,
    darkMode: true
};

class SpaceClicker {
    constructor() {
        this.resources = 0;
        this.clickPower = 1;
        this.autoCollectors = 0;
        this.gameArea = document.getElementById('game-area');
        this.resourceCount = document.getElementById('resource-count');
        this.perClick = document.getElementById('per-click');
        this.startButton = document.getElementById('start-game');
        this.splashScreen = document.getElementById('splash-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.upgrades = document.querySelectorAll('.upgrade');

        this.spaceObjects = [
            '🚀', '⭐', '🌍', '🌙', '☄️', '🌠', '🛸', '🌌'
        ];

        this.init();
    }

    init() {
        this.startButton.addEventListener('click', () => {
            console.log('Start button clicked');
            this.startGame();
        });

        this.upgrades.forEach(upgrade => {
            upgrade.addEventListener('click', () => this.purchaseUpgrade(upgrade));
        });

        // Auto-collector interval
        setInterval(() => this.autoCollect(), 1000);

        // Debug game area on load
        this.debugGameArea();

        // Log that initialization is complete
        console.log('Game initialized');
    }

    debugGameArea() {
        console.log('Game area dimensions:', {
            clientWidth: this.gameArea.clientWidth,
            clientHeight: this.gameArea.clientHeight,
            offsetWidth: this.gameArea.offsetWidth,
            offsetHeight: this.gameArea.offsetHeight,
            getBoundingClientRect: this.gameArea.getBoundingClientRect()
        });

        // Add a visible border for debugging
        this.gameArea.style.border = '2px solid red';

        // Force a minimum size if needed
        if (this.gameArea.clientHeight < 100) {
            this.gameArea.style.minHeight = '300px';
            console.log('Forced minimum height on game area');
        }
    }

    startGame() {
        console.log('Starting game');

        // Hide splash screen and show game screen
        this.splashScreen.classList.remove('active');
        this.gameScreen.classList.add('active');

        // Debug game area after screen change
        setTimeout(() => {
            this.debugGameArea();
            this.spawnObjects();
            console.log('Game started, objects spawned');
        }, 100);
    }

    spawnObjects() {
        console.log('Spawning objects');
        const numObjects = 5;
        for (let i = 0; i < numObjects; i++) {
            this.createSpaceObject();
        }
    }

    createSpaceObject() {
        const object = document.createElement('div');
        object.className = 'space-object';
        object.textContent = this.spaceObjects[Math.floor(Math.random() * this.spaceObjects.length)];

        // Set a fixed size for the objects
        object.style.width = '50px';
        object.style.height = '50px';
        object.style.fontSize = '30px';
        object.style.display = 'flex';
        object.style.alignItems = 'center';
        object.style.justifyContent = 'center';

        // Random position within the visible game area
        const gameAreaRect = this.gameArea.getBoundingClientRect();
        const x = Math.random() * (gameAreaRect.width - 50);
        const y = Math.random() * (gameAreaRect.height - 50);
        object.style.left = `${x}px`;
        object.style.top = `${y}px`;

        object.addEventListener('click', () => this.collectResource(object));
        this.gameArea.appendChild(object);

        // Debug log to verify object creation
        console.log('Created space object at position:', x, y);
    }

    collectResource(object) {
        this.resources += this.clickPower;
        this.updateUI();

        // Animation
        object.style.transform = 'scale(1.5)';
        setTimeout(() => {
            object.style.transform = 'scale(1)';
        }, 200);

        // Create new object if needed
        if (this.gameArea.children.length < 8) {
            this.createSpaceObject();
        }
    }

    autoCollect() {
        if (this.autoCollectors > 0) {
            const objects = document.querySelectorAll('.space-object');
            objects.forEach(object => {
                if (Math.random() < 0.3) { // 30% chance to collect each object
                    this.collectResource(object);
                }
            });
        }
    }

    purchaseUpgrade(upgrade) {
        const cost = parseInt(upgrade.dataset.cost);
        const effect = upgrade.dataset.effect;

        if (this.resources >= cost) {
            this.resources -= cost;

            switch (effect) {
                case 'click-power':
                    this.clickPower *= 2;
                    upgrade.dataset.cost = cost * 2;
                    upgrade.textContent = `Upgrade Click Power (${cost * 2} resources)`;
                    break;
                case 'auto-collect':
                    this.autoCollectors++;
                    upgrade.disabled = true;
                    upgrade.textContent = 'Auto Collector (Purchased)';
                    break;
            }

            this.updateUI();
        }
    }

    updateUI() {
        this.resourceCount.textContent = Math.floor(this.resources);
        this.perClick.textContent = this.clickPower;

        // Update upgrade buttons
        this.upgrades.forEach(upgrade => {
            const cost = parseInt(upgrade.dataset.cost);
            upgrade.disabled = this.resources < cost;
        });
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing game');
    new SpaceClicker();
}); 