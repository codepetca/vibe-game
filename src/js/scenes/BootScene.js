class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // Load logo for the loading screen
        this.load.image('logo', 'assets/images/logo.svg');
    }

    create() {
        // Display the logo
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        this.add.image(width / 2, height / 2, 'logo').setScale(0.8);

        // Add title
        const title = this.add.text(width / 2, height / 2, 'SPACE CLICKER', {
            font: 'bold 48px Arial',
            fill: '#4ecca3'
        });
        title.setOrigin(0.5);

        // Add a loading text
        this.add.text(width / 2, height - 50, 'Click to Start', {
            font: '24px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Add click event to start the preload scene
        this.input.on('pointerdown', () => {
            this.scene.start('PreloadScene');
        });
    }
} 