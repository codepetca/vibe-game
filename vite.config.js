import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                'asteroids': resolve(__dirname, 'games/asteroids/index.html'),
                'space-clicker': resolve(__dirname, 'games/space-clicker/index.html'),
                'roguelike': resolve(__dirname, 'games/roguelike/index.html')
            },
            output: {
                entryFileNames: `[name]/game.bundle.js`,
                chunkFileNames: `[name].[hash].js`,
                assetFileNames: `[name].[ext]`
            }
        },
        outDir: 'dist',
        emptyOutDir: true
    },
    server: {
        port: 3000,
        open: '/',
        // Serve static files from root directory
        publicDir: './'
    }
});