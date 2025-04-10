class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        // Add background
        this.add.image(600, 350, 'background');

        // Initialize game variables
        this.resources = 0;
        this.clickPower = 1;
        this.autoCollectors = 0;
        this.spaceObjects = [];
        this.lastSpawnTime = 0;
        this.spawnInterval = 2000; // 2 seconds

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
        // Create the navigation bar container
        this.navBar = this.add.container(0, 0);

        // Create the navigation bar background
        const navBarBg = this.add.rectangle(150, 350, 300, 700, 0x1a1a2e, 0.8);
        navBarBg.setStrokeStyle(2, 0x4ecca3);
        this.navBar.add(navBarBg);

        // Create the stats section
        this.createStatsSection();

        // Create the upgrades section
        this.createUpgradesSection();

        // Add the navigation bar to the scene
        this.add.existing(this.navBar);
    }

    createStatsSection() {
        // Create stats container with fixed width
        const statsContainer = this.add.container(0, 0);
        const statsWidth = 260; // Fixed width for stats container

        // Add stats title
        const statsTitle = this.add.text(20, 30, 'STATS', {
            font: 'bold 20px Arial',
            fill: '#4ecca3'
        });
        statsContainer.add(statsTitle);

        // Add resource counter
        this.resourceText = this.add.text(20, 70, 'Resources: 0', {
            font: '18px Arial',
            fill: '#ffffff',
            wordWrap: { width: statsWidth - 40 } // Ensure text wraps within container
        });
        statsContainer.add(this.resourceText);

        // Add per click counter
        this.perClickText = this.add.text(20, 100, 'Per Click: 1', {
            font: '18px Arial',
            fill: '#ffffff',
            wordWrap: { width: statsWidth - 40 } // Ensure text wraps within container
        });
        statsContainer.add(this.perClickText);

        // Add auto collector counter
        this.autoCollectorText = this.add.text(20, 130, 'Auto Collectors: 0', {
            font: '18px Arial',
            fill: '#ffffff',
            wordWrap: { width: statsWidth - 40 } // Ensure text wraps within container
        });
        statsContainer.add(this.autoCollectorText);

        // Add stats container to nav bar
        this.navBar.add(statsContainer);
    }

    createUpgradesSection() {
        // Create upgrades container with fixed width
        const upgradesContainer = this.add.container(0, 0);
        const upgradesWidth = 260; // Fixed width for upgrades container

        // Add upgrade title
        const upgradeTitle = this.add.text(20, 180, 'UPGRADES', {
            font: 'bold 20px Arial',
            fill: '#4ecca3'
        });
        upgradesContainer.add(upgradeTitle);

        // Create click power upgrade - make it wider
        const clickPowerUpgrade = this.add.image(150, 250, 'upgrade');
        clickPowerUpgrade.setScale(0.3, 0.3); // Keep height the same
        clickPowerUpgrade.setDisplaySize(200, clickPowerUpgrade.height); // Make it wider
        clickPowerUpgrade.setInteractive();
        upgradesContainer.add(clickPowerUpgrade);

        // Add clear text labels for click power upgrade
        const clickPowerTitle = this.add.text(150, 250, 'Click Power 1', {
            font: 'bold 16px Arial',
            fill: '#ffffff',
            align: 'center',
            wordWrap: { width: 180 } // Wider text area
        });
        clickPowerTitle.setOrigin(0.5, 0.5); // Center the text
        upgradesContainer.add(clickPowerTitle);

        // Create auto collector upgrade - make it wider
        const autoCollectorUpgrade = this.add.image(150, 350, 'upgrade');
        autoCollectorUpgrade.setScale(0.3, 0.3); // Keep height the same
        autoCollectorUpgrade.setDisplaySize(200, autoCollectorUpgrade.height); // Make it wider
        autoCollectorUpgrade.setInteractive();
        upgradesContainer.add(autoCollectorUpgrade);

        // Add clear text labels for auto collector upgrade
        const autoCollectorTitle = this.add.text(150, 350, 'Auto Collector 0', {
            font: 'bold 16px Arial',
            fill: '#ffffff',
            align: 'center',
            wordWrap: { width: 180 } // Wider text area
        });
        autoCollectorTitle.setOrigin(0.5, 0.5); // Center the text
        upgradesContainer.add(autoCollectorTitle);

        // Create tooltips (hidden by default)
        const clickPowerTooltip = this.add.text(20, 290, 'Double your click power\nCost: 10 resources', {
            font: '14px Arial',
            fill: '#ffffff',
            align: 'left',
            backgroundColor: '#1a1a2e',
            padding: { x: 10, y: 5 },
            wordWrap: { width: upgradesWidth - 40 } // Ensure text wraps within container
        });
        clickPowerTooltip.setOrigin(0, 0.5);
        clickPowerTooltip.setVisible(false);
        upgradesContainer.add(clickPowerTooltip);

        const autoCollectorTooltip = this.add.text(20, 390, 'Automatically collect resources\nCost: 50 resources', {
            font: '14px Arial',
            fill: '#ffffff',
            align: 'left',
            backgroundColor: '#1a1a2e',
            padding: { x: 10, y: 5 },
            wordWrap: { width: upgradesWidth - 40 } // Ensure text wraps within container
        });
        autoCollectorTooltip.setOrigin(0, 0.5);
        autoCollectorTooltip.setVisible(false);
        upgradesContainer.add(autoCollectorTooltip);

        // Store original display sizes for hover effects
        const clickPowerOriginalWidth = clickPowerUpgrade.displayWidth;
        const clickPowerOriginalHeight = clickPowerUpgrade.displayHeight;
        const autoCollectorOriginalWidth = autoCollectorUpgrade.displayWidth;
        const autoCollectorOriginalHeight = autoCollectorUpgrade.displayHeight;

        // Add hover effects
        clickPowerUpgrade.on('pointerover', () => {
            // Increase size while maintaining width
            clickPowerUpgrade.setDisplaySize(
                clickPowerOriginalWidth * 1.1,
                clickPowerOriginalHeight * 1.1
            );
            clickPowerTitle.setScale(1.05);
            clickPowerTooltip.setVisible(true);
        });

        clickPowerUpgrade.on('pointerout', () => {
            // Restore original size
            clickPowerUpgrade.setDisplaySize(
                clickPowerOriginalWidth,
                clickPowerOriginalHeight
            );
            clickPowerTitle.setScale(1);
            clickPowerTooltip.setVisible(false);
        });

        autoCollectorUpgrade.on('pointerover', () => {
            // Increase size while maintaining width
            autoCollectorUpgrade.setDisplaySize(
                autoCollectorOriginalWidth * 1.1,
                autoCollectorOriginalHeight * 1.1
            );
            autoCollectorTitle.setScale(1.05);
            autoCollectorTooltip.setVisible(true);
        });

        autoCollectorUpgrade.on('pointerout', () => {
            // Restore original size
            autoCollectorUpgrade.setDisplaySize(
                autoCollectorOriginalWidth,
                autoCollectorOriginalHeight
            );
            autoCollectorTitle.setScale(1);
            autoCollectorTooltip.setVisible(false);
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
                    this.purchaseUpgrade('click-power', 10, clickPowerTooltip, clickPowerTitle);
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
                    this.purchaseUpgrade('auto-collect', 50, autoCollectorTooltip, autoCollectorTitle);
                }
            });
        });

        // Add upgrades container to nav bar
        this.navBar.add(upgradesContainer);
    }

    spawnObjects(count) {
        for (let i = 0; i < count; i++) {
            // Choose random object type
            const objectTypes = ['planet', 'asteroid', 'star'];
            const type = objectTypes[Phaser.Math.Between(0, objectTypes.length - 1)];

            // Create object
            const x = Phaser.Math.Between(400, 1000); // Adjusted spawn area to avoid nav bar
            const y = Phaser.Math.Between(100, 600);
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

    purchaseUpgrade(type, cost, tooltipText, titleText) {
        if (this.resources >= cost) {
            // Deduct cost
            this.resources -= cost;

            // Apply upgrade
            switch (type) {
                case 'click-power':
                    this.clickPower *= 2;
                    tooltipText.setText(`Double your click power\nCost: ${cost * 2} resources`);
                    titleText.setText(`Click Power ${Math.log2(this.clickPower) + 1}`);
                    break;
                case 'auto-collect':
                    this.autoCollectors++;
                    tooltipText.setText(`Automatically collect resources\nCost: ${cost * 2} resources`);
                    titleText.setText(`Auto Collector ${this.autoCollectors}`);
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