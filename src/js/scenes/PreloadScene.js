class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        // Display loading screen
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading...', {
            font: '20px Arial',
            fill: '#ffffff'
        });
        loadingText.setOrigin(0.5, 0.5);

        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2, 320, 50);

        // Loading progress events
        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0x4ecca3, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 + 10, 300 * value, 30);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });

        // Load game assets
        this.load.image('background', 'assets/images/space-bg.svg');
        this.load.image('planet', 'assets/images/planet.svg');
        this.load.image('asteroid', 'assets/images/asteroid.svg');
        this.load.image('star', 'assets/images/star.svg');
        this.load.image('button', 'assets/images/button.svg');
        this.load.image('upgrade', 'assets/images/upgrade.svg');
        this.load.image('logo', 'assets/images/logo.svg');
    }

    create() {
        // Transition to the menu scene
        this.scene.start('MenuScene');
    }
} 