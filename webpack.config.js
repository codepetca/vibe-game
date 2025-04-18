const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        'asteroids': './src/games/asteroids/index.js',
        'space-clicker': './src/games/space-clicker/index.js',
        'roguelike': './src/games/roguelike/index.js'
    },
    output: {
        filename: '[name]/game.bundle.js',
        path: path.resolve(__dirname, 'public/games'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 8080,
    },
};