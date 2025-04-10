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
        this.startButton.addEventListener('click', () => this.startGame());
        this.upgrades.forEach(upgrade => {
            upgrade.addEventListener('click', () => this.purchaseUpgrade(upgrade));
        });

        // Auto-collector interval
        setInterval(() => this.autoCollect(), 1000);
    }

    startGame() {
        this.splashScreen.classList.remove('active');
        this.gameScreen.classList.add('active');
        this.spawnObjects();
    }

    spawnObjects() {
        const numObjects = 5;
        for (let i = 0; i < numObjects; i++) {
            this.createSpaceObject();
        }
    }

    createSpaceObject() {
        const object = document.createElement('div');
        object.className = 'space-object';
        object.textContent = this.spaceObjects[Math.floor(Math.random() * this.spaceObjects.length)];

        // Random position
        const x = Math.random() * (this.gameArea.clientWidth - 50);
        const y = Math.random() * (this.gameArea.clientHeight - 50);
        object.style.left = `${x}px`;
        object.style.top = `${y}px`;

        object.addEventListener('click', () => this.collectResource(object));
        this.gameArea.appendChild(object);
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
    new SpaceClicker();
}); 