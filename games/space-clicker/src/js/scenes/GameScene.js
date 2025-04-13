class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.clickPowerIncrement = 1; // Track the current increment for click power
    }

    create() {
        // Add background
        this.add.image(600, 350, 'background').setDisplaySize(1200, 700);

        // Initialize game variables
        this.resources = 0;
        this.clickPower = 1;
        this.autoCollectors = 0;
        this.spaceObjects = [];
        this.lastSpawnTime = 0;
        this.spawnInterval = 2000; // 2 seconds

        // Initialize upgrade costs
        this.clickPowerCost = 15;
        this.autoCollectorCost = 25;

        // Initialize sound effects
        this.clickSound = this.sound.add('click');
        this.collectSound = this.sound.add('collect');
        this.upgradeSound = this.sound.add('upgrade');

        // Create the navigation bar
        this.createNavBar();

        // Spawn initial objects
        this.spawnObjects(5);

        // Set up auto-collector timer
        this.time.addEvent({
            delay: 1000,
            callback: this.autoCollect,
            callbackScope: this,
            loop: true
        });
    }

    update(time) {
        // Spawn new objects periodically
        if (time - this.lastSpawnTime > this.spawnInterval && this.spaceObjects.length < 8) {
            this.spawnObjects(1);
            this.lastSpawnTime = time;
        }
    }

    createNavBar() {
        // Create navigation bar background
        const navBar = this.add.graphics();
        navBar.fillStyle(0x1a1a2e, 0.8);
        navBar.fillRect(0, 0, 1200, 50); // Top bar for stats

        // Create stats section
        this.createStatsSection();

        // Create bottom bar for upgrade buttons
        const bottomBar = this.add.graphics();
        bottomBar.fillStyle(0x1a1a2e, 0.8);
        bottomBar.fillRect(0, 640, 1200, 60); // Increased height for padding

        // Create upgrade buttons with padding
        this.createUpgradeButton('Click Power', 300, 670, 'click-power');
        this.createUpgradeButton('Auto Collector', 900, 670, 'auto-collect');
    }

    createStatsSection() {
        // Add stats title
        const statsTitle = this.add.text(20, 15, 'STATS', {
            font: 'bold 20px Arial',
            fill: '#4ecca3'
        });

        // Add resource counter
        this.resourceText = this.add.text(120, 15, 'Resources: 0', {
            font: '16px Arial',
            fill: '#ffffff'
        });

        // Add power counter
        this.perClickText = this.add.text(320, 15, 'Power: 1', {
            font: '16px Arial',
            fill: '#ffffff'
        });

        // Add collector counter
        this.autoCollectorText = this.add.text(450, 15, 'Collectors: 0', {
            font: '16px Arial',
            fill: '#ffffff'
        });
    }

    createUpgradeButton(text, x, y, type) {
        // Create button background with padding
        const button = this.add.graphics();
        button.fillStyle(0x4ecca3, 0.8);
        button.fillRoundedRect(x - 120, y - 30, 240, 60, 10); // Increased size for padding

        // Create button text
        const buttonText = this.make.text({
            x: x,
            y: y,
            text: text,
            style: {
                font: '16px Arial',
                fill: '#ffffff'
            }
        });
        buttonText.setOrigin(0.5, 0.5);

        // Store original text
        const originalText = text;

        // Make interactive with larger hit area
        button.setInteractive(new Phaser.Geom.Rectangle(x - 120, y - 30, 240, 60), Phaser.Geom.Rectangle.Contains);

        // Add hover effect
        button.on('pointerover', () => {
            button.clear();
            button.fillStyle(0x4ecca3, 1);
            button.fillRoundedRect(x - 120, y - 30, 240, 60, 10);

            // Show tooltip
            const cost = type === 'click-power' ? this.clickPowerCost : this.autoCollectorCost;
            if (type === 'click-power') {
                buttonText.setText(`Increase click power by +${this.clickPowerIncrement}\nCost: ${cost} resources`);
            } else {
                buttonText.setText(`Automatically collect resources\nCost: ${cost} resources`);
            }
            buttonText.setFontSize(14);
        });

        button.on('pointerout', () => {
            button.clear();
            button.fillStyle(0x4ecca3, 0.8);
            button.fillRoundedRect(x - 120, y - 30, 240, 60, 10);

            // Restore original text
            buttonText.setText(originalText);
            buttonText.setFontSize(16);
        });

        // Add click handler
        button.on('pointerdown', () => {
            const cost = type === 'click-power' ? this.clickPowerCost : this.autoCollectorCost;
            this.purchaseUpgrade(type, cost, buttonText, buttonText);
        });
    }

    spawnObjects(count) {
        const meteorTypes = ['meteor1', 'meteor2', 'meteor3', 'meteor4', 'meteor5'];

        for (let i = 0; i < count; i++) {
            const x = Phaser.Math.Between(100, 1100);
            const y = Phaser.Math.Between(100, 600); // Adjusted to avoid bottom bar
            const scale = Phaser.Math.FloatBetween(0.5, 1.0);
            const rotation = Phaser.Math.FloatBetween(0, Math.PI * 2);

            const meteorType = meteorTypes[Phaser.Math.Between(0, meteorTypes.length - 1)];
            const object = this.add.image(x, y, meteorType)
                .setScale(scale)
                .setRotation(rotation)
                .setInteractive({ useHandCursor: true });

            // Add hover effect
            object.on('pointerover', () => {
                this.tweens.add({
                    targets: object,
                    scale: scale * 1.1,
                    duration: 200
                });
            });

            object.on('pointerout', () => {
                this.tweens.add({
                    targets: object,
                    scale: scale,
                    duration: 200
                });
            });

            object.on('pointerdown', () => this.collectResource(object));

            this.spaceObjects.push(object);
        }
    }

    collectResource(object) {
        // Add resources
        this.resources += this.clickPower;

        // Play sound effect
        this.clickSound.play();

        // Update UI
        this.updateUI();

        // Animation
        this.tweens.add({
            targets: object,
            scale: object.scale * 1.5,
            duration: 200,
            yoyo: true,
            onComplete: () => {
                // Play collect sound
                this.collectSound.play();
                // Remove object
                object.destroy();
                this.spaceObjects = this.spaceObjects.filter(obj => obj !== object);
            }
        });
    }

    autoCollect() {
        if (this.autoCollectors > 0) {
            // 30% chance to collect each object
            this.spaceObjects.forEach(object => {
                if (Phaser.Math.Between(0, 100) < 30) {
                    this.collectResource(object);
                }
            });
        }
    }

    purchaseUpgrade(type, cost, tooltipText, titleText) {
        if (this.resources >= cost) {
            // Deduct cost
            this.resources -= cost;

            // Play upgrade sound
            this.upgradeSound.play();

            // Apply upgrade
            switch (type) {
                case 'click-power':
                    // Add the current increment to click power
                    this.clickPower += this.clickPowerIncrement;
                    // Increase the increment by 2 for next level
                    this.clickPowerIncrement += 2;

                    const newClickPowerText = `Click Power ${this.clickPower}`;
                    titleText.setText(newClickPowerText);
                    this.clickPowerOriginalText = newClickPowerText;

                    // Increase cost for next upgrade (exponential scaling)
                    this.clickPowerCost = Math.floor(this.clickPowerCost * 1.8);
                    break;
                case 'auto-collect':
                    this.autoCollectors++;
                    const newAutoCollectorText = `Auto Collector ${this.autoCollectors}`;
                    titleText.setText(newAutoCollectorText);
                    this.autoCollectorOriginalText = newAutoCollectorText;

                    // Increase cost for next upgrade (1.5x scaling instead of 2x)
                    this.autoCollectorCost = Math.floor(this.autoCollectorCost * 1.5);
                    break;
            }

            // Update UI
            this.updateUI();
        }
    }

    updateUI() {
        this.resourceText.setText(`Resources: ${this.resources}`);
        this.perClickText.setText(`Power: ${this.clickPower}`);
        this.autoCollectorText.setText(`Collectors: ${this.autoCollectors}`);
    }
} 