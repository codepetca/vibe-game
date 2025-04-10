class DarkMode {
    constructor() {
        this.toggle = document.getElementById('dark-mode-toggle');
        this.body = document.body;
        this.isDarkMode = true;

        this.init();
    }

    init() {
        // Check for saved preference
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode !== null) {
            this.isDarkMode = savedMode === 'true';
            this.updateTheme();
        }

        this.toggle.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        this.updateTheme();
        localStorage.setItem('darkMode', this.isDarkMode);

        // Update game background if game is running
        if (window.game && window.game.scene.scenes.length > 0) {
            const gameScene = window.game.scene.scenes.find(scene => scene.scene.key === 'GameScene');
            if (gameScene) {
                gameScene.cameras.main.setBackgroundColor(this.isDarkMode ? '#1a1a2e' : '#f0f0f0');
            }
        }
    }

    updateTheme() {
        if (this.isDarkMode) {
            this.body.classList.remove('light-mode');
            this.toggle.textContent = '🌙';
            document.body.style.backgroundColor = '#1a1a2e';
        } else {
            this.body.classList.add('light-mode');
            this.toggle.textContent = '☀️';
            document.body.style.backgroundColor = '#f0f0f0';
        }
    }
}

// Initialize dark mode when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DarkMode();
}); 