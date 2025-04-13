class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        console.log('BootScene started');
    }

    create() {
        console.log('BootScene create, starting PreloadScene');
        this.scene.start('PreloadScene');
    }
} 