class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        console.log('GameScene create started');

        // Add background
        this.add.image(0, 0, 'background')
            .setOrigin(0, 0)
            .setDisplaySize(1200, 700);

        // Create the player ship
        this.ship = this.add.image(600, 350, 'ship');
        this.ship.setScale(0.5); // Make ship smaller
        this.physics.add.existing(this.ship);
        this.ship.body.setCollideWorldBounds(true);

        // Create asteroids group
        this.asteroids = this.add.group();
        for (let i = 0; i < 5; i++) {
            const x = Phaser.Math.Between(100, 1100);
            const y = Phaser.Math.Between(100, 600);
            const size = Phaser.Math.Between(0, 2);
            const asteroid = this.add.image(x, y,
                size === 0 ? 'asteroid_large' :
                    size === 1 ? 'asteroid_medium' : 'asteroid_small'
            );
            asteroid.setScale(0.5);
            this.physics.add.existing(asteroid);
            asteroid.body.setVelocity(
                Phaser.Math.Between(-100, 100),
                Phaser.Math.Between(-100, 100)
            );
            this.asteroids.add(asteroid);
        }

        // Set up controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Add debug text
        this.debugText = this.add.text(10, 10, '', {
            font: '16px Arial',
            fill: '#ffffff'
        });

        console.log('GameScene create completed successfully');
    }

    update() {
        // Update debug text
        this.debugText.setText([
            'Ship Position: ' + Math.floor(this.ship.x) + ', ' + Math.floor(this.ship.y),
            'Ship Rotation: ' + Math.floor(this.ship.rotation * (180 / Math.PI)) + '°'
        ]);

        // Handle ship movement
        if (this.cursors.left.isDown) {
            this.ship.rotation -= 0.05;
        } else if (this.cursors.right.isDown) {
            this.ship.rotation += 0.05;
        }

        if (this.cursors.up.isDown) {
            const angle = this.ship.rotation - Math.PI / 2;
            this.ship.body.setVelocity(
                Math.cos(angle) * 200,
                Math.sin(angle) * 200
            );
        } else {
            this.ship.body.setVelocity(0, 0);
        }

        // Handle shooting
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            const angle = this.ship.rotation - Math.PI / 2;
            const bullet = this.add.image(
                this.ship.x + Math.cos(angle) * 20,
                this.ship.y + Math.sin(angle) * 20,
                'bullet'
            );
            bullet.setRotation(angle + Math.PI / 2);
            this.physics.add.existing(bullet);
            bullet.body.setVelocity(
                Math.cos(angle) * 400,
                Math.sin(angle) * 400
            );
        }
    }
} 