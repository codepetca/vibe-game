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
    }

    updateTheme() {
        if (this.isDarkMode) {
            this.body.classList.remove('light-mode');
            this.toggle.textContent = '🌙';
        } else {
            this.body.classList.add('light-mode');
            this.toggle.textContent = '☀️';
        }
    }
}

// Initialize dark mode when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DarkMode();
}); 