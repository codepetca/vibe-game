class PreloadScene extends Phaser.Scene {
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

        // Load ships - keep 'ship' for backward compatibility
        this.load.image('ship', 'assets/images/Ships/playerShip3_blue.png');

        // Load all ship types
        // Ship type 1
        this.load.image('playerShip1_blue', 'assets/images/Ships/playerShip1_blue.png');
        this.load.image('playerShip1_green', 'assets/images/Ships/playerShip1_green.png');
        this.load.image('playerShip1_orange', 'assets/images/Ships/playerShip1_orange.png');
        this.load.image('playerShip1_red', 'assets/images/Ships/playerShip1_red.png');

        // Ship type 2
        this.load.image('playerShip2_blue', 'assets/images/Ships/playerShip2_blue.png');
        this.load.image('playerShip2_green', 'assets/images/Ships/playerShip2_green.png');
        this.load.image('playerShip2_orange', 'assets/images/Ships/playerShip2_orange.png');
        this.load.image('playerShip2_red', 'assets/images/Ships/playerShip2_red.png');

        // Ship type 3
        this.load.image('playerShip3_blue', 'assets/images/Ships/playerShip3_blue.png');
        this.load.image('playerShip3_green', 'assets/images/Ships/playerShip3_green.png');
        this.load.image('playerShip3_orange', 'assets/images/Ships/playerShip3_orange.png');
        this.load.image('playerShip3_red', 'assets/images/Ships/playerShip3_red.png');

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