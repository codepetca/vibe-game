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

        // Create player using our new Player class
        this.player = new Player(this, 600, 350);

        // Create asteroids group
        this.asteroids = this.add.group();

        // Create initial asteroids
        for (let i = 0; i < 3; i++) {
            this.createAsteroid();
        }

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
        // Update the player
        this.player.update();

        // Update debug text
        this.debugText.setText([
            'Asteroids: ' + this.asteroids.getLength(),
            'Score: ' + this.player.getScore()
        ]);

        // Check for bullet-asteroid collisions
        this.physics.overlap(this.player.getBullets(), this.asteroids, (bullet, asteroid) => {
            // Create explosion at asteroid position
            this.createExplosion(asteroid.x, asteroid.y);

            // Remove the bullet and asteroid
            bullet.destroy();
            asteroid.destroy();

            // Add score for asteroid hit
            this.player.addScore(100);

            console.log('Asteroid destroyed by bullet at', asteroid.x, asteroid.y, 'Total:', this.asteroids.getLength());
        });

        // Check for player-asteroid collisions
        this.physics.overlap(this.player.getShipSprite(), this.asteroids, () => {
            // Handle player collision with asteroid
            this.player.hit();
            console.log('Player hit by asteroid');
        });

        // Clean up off-screen asteroids
        const asteroidsToRemove = [];

        // Find asteroids to remove
        this.asteroids.getChildren().forEach(asteroid => {
            if (asteroid.x < -100 || asteroid.x > 1300 || asteroid.y < -100 || asteroid.y > 800) {
                asteroidsToRemove.push(asteroid);
                console.log('Asteroid going off screen at', asteroid.x, asteroid.y);
            }
        });

        // Remove asteroids
        asteroidsToRemove.forEach(asteroid => {
            asteroid.destroy();
            console.log('Asteroid removed at', asteroid.x, asteroid.y, 'Total:', this.asteroids.getLength());
        });
    }
}