class Ship {
    constructor(scene, x, y, texture = 'playerShip3_blue') {
        this.scene = scene;
        this.sprite = scene.add.image(x, y, texture);
        this.sprite.setScale(0.5);

        // Add physics to the ship
        scene.physics.add.existing(this.sprite);
        this.sprite.body.setCollideWorldBounds(true);

        // Store ship properties
        this.speed = 200;
        this.rotationSpeed = 0.05;
    }

    /**
     * Update ship rotation
     * @param {number} rotation - Rotation value, negative for left, positive for right
     */
    rotate(rotation) {
        this.sprite.rotation += rotation * this.rotationSpeed;
    }

    /**
     * Apply thrust in the direction the ship is pointing
     * @param {boolean} isThrusting - Whether the ship is thrusting
     */
    thrust(isThrusting) {
        if (isThrusting) {
            const angle = this.sprite.rotation - Math.PI / 2;
            this.sprite.body.setVelocity(
                Math.cos(angle) * this.speed,
                Math.sin(angle) * this.speed
            );
        } else {
            this.sprite.body.setVelocity(0, 0);
        }
    }

    /**
     * Get the position and angle for spawning bullets
     * @returns {Object} Position and angle information
     */
    getBulletSpawnPoint() {
        const angle = this.sprite.rotation - Math.PI / 2;
        return {
            x: this.sprite.x + Math.cos(angle) * 20,
            y: this.sprite.y + Math.sin(angle) * 20,
            angle: angle
        };
    }

    /**
     * Get the sprite associated with this ship
     * @returns {Phaser.GameObjects.Image} The ship sprite
     */
    getSprite() {
        return this.sprite;
    }

    /**
     * Get the position of the ship
     * @returns {Object} x and y coordinates
     */
    getPosition() {
        return {
            x: this.sprite.x,
            y: this.sprite.y
        };
    }
}