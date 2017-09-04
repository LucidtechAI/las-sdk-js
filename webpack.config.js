const path = require('path');

module.exports = {
    entry: ['whatwg-fetch', './index.js'],
    target: 'node',
    output: {
        path: path.resolve('dist'),
        filename: 'build.js',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    }
};
