class Player {
    constructor(scene, x, y, shipType = 'playerShip3_blue') {
        this.scene = scene;

        // Create the player's ship
        this.ship = new Ship(scene, x, y, shipType);

        // Set up controls
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.spacebar = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Player properties
        this.score = 0;
        this.lives = 3;

        // Bullet management
        this.bullets = scene.add.group();
        this.lastShotTime = 0;
        this.shootCooldown = 250; // milliseconds between shots
    }

    /**
     * Update player based on controls
     */
    update() {
        // Handle ship rotation
        if (this.cursors.left.isDown) {
            this.ship.rotate(-1);
        } else if (this.cursors.right.isDown) {
            this.ship.rotate(1);
        }

        // Handle ship thrust
        this.ship.thrust(this.cursors.up.isDown);

        // Handle shooting
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.shoot();
        }

        // Update bullets
        this.updateBullets();
    }

    /**
     * Handle shooting bullets
     */
    shoot() {
        const currentTime = this.scene.time.now;

        // Check if enough time has passed since the last shot
        if (currentTime - this.lastShotTime < this.shootCooldown) {
            return;
        }

        // Update the last shot time
        this.lastShotTime = currentTime;

        // Get the spawn point and angle for the bullet
        const { x, y, angle } = this.ship.getBulletSpawnPoint();

        // Create the bullet
        const bullet = this.scene.add.image(x, y, 'bullet');
        bullet.setScale(0.5);
        bullet.setRotation(angle + Math.PI / 2);

        // Add physics to the bullet
        this.scene.physics.add.existing(bullet);
        bullet.body.setVelocity(
            Math.cos(angle) * 400,
            Math.sin(angle) * 400
        );

        // Add the bullet to the group
        this.bullets.add(bullet);
    }

    /**
     * Update and clean up bullets
     */
    updateBullets() {
        const bulletsToRemove = [];
        const gameWidth = this.scene.sys.game.config.width;
        const gameHeight = this.scene.sys.game.config.height;

        // Find bullets to remove
        this.bullets.getChildren().forEach(bullet => {
            if (bullet.x < 0 || bullet.x > gameWidth || bullet.y < 0 || bullet.y > gameHeight) {
                bulletsToRemove.push(bullet);
            }
        });

        // Remove bullets
        bulletsToRemove.forEach(bullet => {
            bullet.destroy();
        });
    }

    /**
     * Get the bullets group
     * @returns {Phaser.GameObjects.Group} The bullets group
     */
    getBullets() {
        return this.bullets;
    }

    /**
     * Get the ship sprite for collision detection
     * @returns {Phaser.GameObjects.Image} The ship sprite
     */
    getShipSprite() {
        return this.ship.getSprite();
    }

    /**
     * Increase the player's score
     * @param {number} points - Points to add to the score
     */
    addScore(points) {
        this.score += points;
    }

    /**
     * Get the current score
     * @returns {number} Current score
     */
    getScore() {
        return this.score;
    }

    /**
     * Handle player hit by asteroid
     */
    hit() {
        this.lives -= 1;
        // Could add visual feedback or invulnerability here

        // Check for game over
        if (this.lives <= 0) {
            // Game over logic could be implemented here
        }
    }
}