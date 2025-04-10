class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        // Add background
        this.add.image(400, 300, 'background');

        // Initialize game variables
        this.resources = 0;
        this.clickPower = 1;
        this.autoCollectors = 0;
        this.spaceObjects = [];
        this.lastSpawnTime = 0;
        this.spawnInterval = 2000; // 2 seconds

        // Add UI elements
        this.createUI();

        // Add upgrade buttons
        this.createUpgrades();

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

    createUI() {
        // Add resource counter
        this.resourceText = this.add.text(20, 20, 'Resources: 0', {
            font: '24px Arial',
            fill: '#ffffff'
        });

        // Add per click counter
        this.perClickText = this.add.text(20, 60, 'Per Click: 1', {
            font: '24px Arial',
            fill: '#ffffff'
        });

        // Add auto collector counter
        this.autoCollectorText = this.add.text(20, 100, 'Auto Collectors: 0', {
            font: '24px Arial',
            fill: '#ffffff'
        });
    }

    createUpgrades() {
        // Create upgrade container
        const upgradeContainer = this.add.container(400, 550);

        // Add upgrade title
        const upgradeTitle = this.add.text(0, -30, 'UPGRADES', {
            font: 'bold 24px Arial',
            fill: '#4ecca3'
        });
        upgradeTitle.setOrigin(0.5);
        upgradeContainer.add(upgradeTitle);

        // Create click power upgrade
        const clickPowerUpgrade = this.add.image(-150, 0, 'upgrade');
        clickPowerUpgrade.setScale(0.3);
        clickPowerUpgrade.setInteractive();

        // Add clear text labels for click power upgrade
        const clickPowerTitle = this.add.text(-150, -50, 'CLICK POWER', {
            font: 'bold 16px Arial',
            fill: '#ffffff',
            align: 'center'
        });
        clickPowerTitle.setOrigin(0.5);

        const clickPowerDesc = this.add.text(-150, 0, 'Double your click power\nCost: 10 resources', {
            font: '14px Arial',
            fill: '#ffffff',
            align: 'center'
        });
        clickPowerDesc.setOrigin(0.5);

        const clickPowerLevel = this.add.text(-150, 50, 'Level: 1', {
            font: '14px Arial',
            fill: '#4ecca3',
            align: 'center'
        });
        clickPowerLevel.setOrigin(0.5);

        // Create auto collector upgrade
        const autoCollectorUpgrade = this.add.image(150, 0, 'upgrade');
        autoCollectorUpgrade.setScale(0.3);
        autoCollectorUpgrade.setInteractive();

        // Add clear text labels for auto collector upgrade
        const autoCollectorTitle = this.add.text(150, -50, 'AUTO COLLECTOR', {
            font: 'bold 16px Arial',
            fill: '#ffffff',
            align: 'center'
        });
        autoCollectorTitle.setOrigin(0.5);

        const autoCollectorDesc = this.add.text(150, 0, 'Automatically collect resources\nCost: 50 resources', {
            font: '14px Arial',
            fill: '#ffffff',
            align: 'center'
        });
        autoCollectorDesc.setOrigin(0.5);

        const autoCollectorLevel = this.add.text(150, 50, 'Level: 0', {
            font: '14px Arial',
            fill: '#4ecca3',
            align: 'center'
        });
        autoCollectorLevel.setOrigin(0.5);

        // Add hover effects
        clickPowerUpgrade.on('pointerover', () => {
            clickPowerUpgrade.setScale(0.35);
            clickPowerTitle.setScale(1.05);
            clickPowerDesc.setScale(1.05);
            clickPowerLevel.setScale(1.05);
        });

        clickPowerUpgrade.on('pointerout', () => {
            clickPowerUpgrade.setScale(0.3);
            clickPowerTitle.setScale(1);
            clickPowerDesc.setScale(1);
            clickPowerLevel.setScale(1);
        });

        autoCollectorUpgrade.on('pointerover', () => {
            autoCollectorUpgrade.setScale(0.35);
            autoCollectorTitle.setScale(1.05);
            autoCollectorDesc.setScale(1.05);
            autoCollectorLevel.setScale(1.05);
        });

        autoCollectorUpgrade.on('pointerout', () => {
            autoCollectorUpgrade.setScale(0.3);
            autoCollectorTitle.setScale(1);
            autoCollectorDesc.setScale(1);
            autoCollectorLevel.setScale(1);
        });

        // Add click handlers with visual feedback
        clickPowerUpgrade.on('pointerdown', () => {
            // Visual feedback - flash effect
            this.tweens.add({
                targets: clickPowerUpgrade,
                alpha: 0.5,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    this.purchaseUpgrade('click-power', 10, clickPowerDesc, clickPowerLevel);
                }
            });
        });

        autoCollectorUpgrade.on('pointerdown', () => {
            // Visual feedback - flash effect
            this.tweens.add({
                targets: autoCollectorUpgrade,
                alpha: 0.5,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    this.purchaseUpgrade('auto-collect', 50, autoCollectorDesc, autoCollectorLevel);
                }
            });
        });

        // Add all elements to the container
        upgradeContainer.add([
            clickPowerUpgrade, clickPowerTitle, clickPowerDesc, clickPowerLevel,
            autoCollectorUpgrade, autoCollectorTitle, autoCollectorDesc, autoCollectorLevel
        ]);
    }

    spawnObjects(count) {
        for (let i = 0; i < count; i++) {
            // Choose random object type
            const objectTypes = ['planet', 'asteroid', 'star'];
            const type = objectTypes[Phaser.Math.Between(0, objectTypes.length - 1)];

            // Create object
            const x = Phaser.Math.Between(100, 700);
            const y = Phaser.Math.Between(100, 500);
            const object = this.add.image(x, y, type);

            // Set random scale
            const scale = Phaser.Math.FloatBetween(0.5, 1.5);
            object.setScale(scale);

            // Make interactive
            object.setInteractive();

            // Add click handler
            object.on('pointerdown', () => {
                this.collectResource(object);
            });

            // Add to array
            this.spaceObjects.push(object);
        }
    }

    collectResource(object) {
        // Add resources
        this.resources += this.clickPower;

        // Update UI
        this.updateUI();

        // Animation
        this.tweens.add({
            targets: object,
            scale: object.scale * 1.5,
            duration: 200,
            yoyo: true,
            onComplete: () => {
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

    purchaseUpgrade(type, cost, descText, levelText) {
        if (this.resources >= cost) {
            // Deduct cost
            this.resources -= cost;

            // Apply upgrade
            switch (type) {
                case 'click-power':
                    this.clickPower *= 2;
                    descText.setText(`Double your click power\nCost: ${cost * 2} resources`);
                    levelText.setText(`Level: ${Math.log2(this.clickPower) + 1}`);
                    break;
                case 'auto-collect':
                    this.autoCollectors++;
                    descText.setText(`Automatically collect resources\nCost: ${cost * 2} resources`);
                    levelText.setText(`Level: ${this.autoCollectors}`);
                    break;
            }

            // Update UI
            this.updateUI();
        }
    }

    updateUI() {
        this.resourceText.setText(`Resources: ${this.resources}`);
        this.perClickText.setText(`Per Click: ${this.clickPower}`);
        this.autoCollectorText.setText(`Auto Collectors: ${this.autoCollectors}`);
    }
} 