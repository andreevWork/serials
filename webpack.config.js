const path = require('path');

const dist = path.resolve(__dirname, 'dist');

module.exports = {

    entry: './src/index.js',

    output: {
        path: dist,
        filename: 'index.js'
    },

    devServer: {
        contentBase: dist,
        compress: true,
        port: 3000
    }
};