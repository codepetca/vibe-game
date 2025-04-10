class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        // Add background
        this.add.image(400, 300, 'background');

        // Add logo
        this.add.image(400, 150, 'logo').setScale(0.8);

        // Add title
        const title = this.add.text(400, 150, 'SPACE CLICKER', {
            font: 'bold 48px Arial',
            fill: '#4ecca3'
        });
        title.setOrigin(0.5);

        // Add instructions
        const instructions = this.add.text(400, 250, 'Click space objects to collect resources\nand upgrade your collection abilities!', {
            font: '24px Arial',
            fill: '#ffffff',
            align: 'center'
        });
        instructions.setOrigin(0.5);

        // Add start button
        const startButton = this.add.image(400, 400, 'button');
        startButton.setScale(0.3);
        startButton.setInteractive();

        const startText = this.add.text(400, 400, 'START', {
            font: 'bold 32px Arial',
            fill: '#1a1a2e'
        });
        startText.setOrigin(0.5);

        // Add hover effect
        startButton.on('pointerover', () => {
            startButton.setScale(0.35);
            startText.setScale(1.05);
        });

        startButton.on('pointerout', () => {
            startButton.setScale(0.3);
            startText.setScale(1);
        });

        // Start game on click
        startButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });
    }
} 