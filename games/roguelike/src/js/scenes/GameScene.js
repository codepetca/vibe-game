class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        console.log('GameScene create started');

        // Create a simple test map
        const testMap = this.make.tilemap({
            tileWidth: 16,
            tileHeight: 16,
            width: 50,
            height: 50
        });

        // Add tileset with proper spacing configuration
        const tileset = testMap.addTilesetImage('roguelikeSheet', 'roguelikeSheet', 16, 16, 1, 1);

        // Create a simple ground layer
        const groundLayer = testMap.createBlankLayer('Ground', tileset);
        groundLayer.fill(0); // Fill with first tile (usually ground)

        // Create a simple wall layer
        const wallLayer = testMap.createBlankLayer('Walls', tileset);

        // Add some walls around the edges
        wallLayer.fill(1, 0, 0, 50, 1); // Top wall
        wallLayer.fill(1, 0, 49, 50, 1); // Bottom wall
        wallLayer.fill(1, 0, 0, 1, 50); // Left wall
        wallLayer.fill(1, 49, 0, 1, 50); // Right wall

        // Add some random walls inside
        for (let i = 0; i < 50; i++) {
            const x = Phaser.Math.Between(2, 47);
            const y = Phaser.Math.Between(2, 47);
            wallLayer.putTileAt(1, x, y);
        }

        wallLayer.setCollisionByProperty({ collides: true });

        // Create player
        this.player = this.add.sprite(400, 300, 'roguelikeSheet', 0);
        this.player.setScale(2);

        // Set up camera to follow player
        this.cameras.main.setBounds(0, 0, 800, 600);
        this.cameras.main.startFollow(this.player);

        // Add physics
        this.physics.world.setBounds(0, 0, 800, 600);
        this.physics.add.existing(this.player);

        // Set up controls
        this.cursors = this.input.keyboard.createCursorKeys();

        // Add debug text
        this.debugText = this.add.text(10, 10, '', {
            font: '16px monospace',
            fill: '#ffffff'
        });
        this.debugText.setScrollFactor(0);

        console.log('GameScene create completed successfully');
    }

    update() {
        if (!this.player) return;

        // Handle player movement
        const speed = 200;
        this.player.body.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-speed);
            this.player.setFrame(12); // Left-facing frame
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(speed);
            this.player.setFrame(6); // Right-facing frame
        }

        if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-speed);
            this.player.setFrame(3); // Up-facing frame
        } else if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(speed);
            this.player.setFrame(0); // Down-facing frame
        }

        // Update debug text
        this.debugText.setText([
            'Player Position:',
            `X: ${Math.floor(this.player.x)}`,
            `Y: ${Math.floor(this.player.y)}`
        ]);
    }
} 