import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        console.log('PreloadScene started');

        // Add debug logging
        this.load.on('filecomplete', (key, type, data) => {
            console.log('Loaded:', key, type);
        });

        this.load.on('loaderror', (fileObj) => {
            console.error('Error loading:', fileObj);
            console.error('Error details:', fileObj.error);
        });

        // Load background
        this.load.image('background', 'assets/images/Backgrounds/black.png');

        // Load ship
        this.load.image('ship', 'assets/images/Ships/playerShip3_blue.png');

        // Load asteroids
        this.load.image('asteroid_large', 'assets/images/Meteors/meteorGrey_big1.png');
        this.load.image('asteroid_medium', 'assets/images/Meteors/meteorGrey_med1.png');
        this.load.image('asteroid_small', 'assets/images/Meteors/meteorGrey_small1.png');

        // Load bullets
        this.load.image('bullet', 'assets/images/Lasers/laserBlue01.png');

        // Add progress bar
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
        });
    }

    create() {
        console.log('PreloadScene complete, starting GameScene');
        this.scene.start('GameScene');
    }
}