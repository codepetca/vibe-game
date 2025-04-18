import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        console.log('BootScene started');
        // No need to load loading screen assets
    }

    create() {
        console.log('BootScene create, starting PreloadScene');
        this.scene.start('PreloadScene');
    }
}