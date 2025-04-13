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

        // Skip loading assets for now since they don't exist
        // We'll use simple shapes in the GameScene instead

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