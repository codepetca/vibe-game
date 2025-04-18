import Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
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
        this.ship.setScale(0.5);
        this.physics.add.existing(this.ship);
        this.ship.body.setCollideWorldBounds(true);

        // Create asteroids group
        this.asteroids = this.add.group();

        // Create initial asteroids
        for (let i = 0; i < 3; i++) {
            this.createAsteroid();
        }

        // Create bullets group
        this.bullets = this.add.group();

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

    createAsteroid() {
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
        asteroid.setData('size', size);
        this.asteroids.add(asteroid);
        console.log('Created asteroid at', x, y, 'Total:', this.asteroids.getLength());
    }

    createExplosion(x, y) {
        const explosion = this.add.circle(x, y, 20, 0xff0000);
        this.tweens.add({
            targets: explosion,
            radius: 40,
            alpha: 0,
            duration: 300,
            onComplete: () => explosion.destroy()
        });
    }

    update() {
        // Update debug text
        this.debugText.setText([
            'Asteroids: ' + this.asteroids.getLength()
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
            bullet.setScale(0.5);
            bullet.setRotation(angle + Math.PI / 2);
            this.physics.add.existing(bullet);
            bullet.body.setVelocity(
                Math.cos(angle) * 400,
                Math.sin(angle) * 400
            );
            this.bullets.add(bullet);
        }

        // Check for bullet-asteroid collisions
        this.physics.overlap(this.bullets, this.asteroids, (bullet, asteroid) => {
            // Create explosion at asteroid position
            this.createExplosion(asteroid.x, asteroid.y);

            // Remove the bullet and asteroid
            bullet.destroy();
            asteroid.destroy();
            console.log('Asteroid destroyed by bullet at', asteroid.x, asteroid.y, 'Total:', this.asteroids.getLength());
        });

        // Clean up off-screen objects
        const bulletsToRemove = [];
        const asteroidsToRemove = [];

        // Find bullets to remove
        this.bullets.getChildren().forEach(bullet => {
            if (bullet.x < 0 || bullet.x > 1200 || bullet.y < 0 || bullet.y > 700) {
                bulletsToRemove.push(bullet);
            }
        });

        // Find asteroids to remove
        this.asteroids.getChildren().forEach(asteroid => {
            if (asteroid.x < -100 || asteroid.x > 1300 || asteroid.y < -100 || asteroid.y > 800) {
                asteroidsToRemove.push(asteroid);
                console.log('Asteroid going off screen at', asteroid.x, asteroid.y);
            }
        });

        // Remove bullets
        bulletsToRemove.forEach(bullet => {
            bullet.destroy();
        });

        // Remove asteroids
        asteroidsToRemove.forEach(asteroid => {
            asteroid.destroy();
            console.log('Asteroid removed at', asteroid.x, asteroid.y, 'Total:', this.asteroids.getLength());
        });
    }
}