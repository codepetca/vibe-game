import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        // Create loading screen
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Create a simple gradient background
        const gradient = this.add.graphics();
        const gradientFill = gradient.fillGradientStyle(0x1a1a2e, 0x1a1a2e, 0x4ecca3, 0x4ecca3, 1);
        gradient.fillRect(0, 0, width, height);

        // Progress bar background
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

        // Loading text
        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px Arial',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        // Progress text
        const percentText = this.make.text({
            x: width / 2,
            y: height / 2,
            text: '0%',
            style: {
                font: '18px Arial',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        // Update progress bar
        this.load.on('progress', (value) => {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0x4ecca3, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
        });

        // Handle loading errors
        this.load.on('loaderror', (file) => {
            console.error('Error loading file:', file.key, file.url);
        });

        // Cleanup when complete
        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            gradient.destroy();
        });

        // Load game assets with relative paths
        const basePath = 'assets/';

        // Load background
        this.load.image('background', basePath + 'images/Backgrounds/darkPurple.png');

        // Load meteor assets
        this.load.image('meteor1', basePath + 'images/Meteors/meteorGrey_big1.png');
        this.load.image('meteor2', basePath + 'images/Meteors/meteorGrey_big2.png');
        this.load.image('meteor3', basePath + 'images/Meteors/meteorGrey_big3.png');
        this.load.image('meteor4', basePath + 'images/Meteors/meteorBrown_big1.png');
        this.load.image('meteor5', basePath + 'images/Meteors/meteorBrown_big2.png');

        // Load audio assets
        this.load.audio('click', basePath + 'audio/sfx/sfx_laser1.ogg');
        this.load.audio('collect', basePath + 'audio/sfx/sfx_zap.ogg');
        this.load.audio('upgrade', basePath + 'audio/sfx/sfx_shieldUp.ogg');

        // Start loading
        this.load.start();
    }

    create() {
        this.scene.start('GameScene');
    }
}