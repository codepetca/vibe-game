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
        });

        // Load spritesheet with proper spacing configuration
        this.load.spritesheet('roguelikeSheet', 'assets/images/Spritesheet/roguelikeSheet_transparent.png', {
            frameWidth: 16,
            frameHeight: 16,
            margin: 1,
            spacing: 1
        });

        // Skip loading tilemaps for now since we're using the test map
        // this.load.tilemapTiledJSON('sample_map', 'assets/images/Map/sample_map.json');
        // this.load.tilemapTiledJSON('sample_indoor', 'assets/images/Map/sample_indoor.json');

        // Skip loading audio for now
        // this.load.audio('walk', 'assets/audio/walk.mp3');
        // this.load.audio('attack', 'assets/audio/attack.mp3');
        // this.load.audio('hit', 'assets/audio/hit.mp3');
        // this.load.audio('pickup', 'assets/audio/pickup.mp3');
    }

    create() {
        console.log('PreloadScene complete, starting GameScene');
        this.scene.start('GameScene');
    }
} 