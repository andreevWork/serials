const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const dist = path.resolve(__dirname, 'dist');

module.exports = {

    entry: './src/index.js',

    output: {
        path: dist,
        filename: 'index.js'
    },

    resolve: {
      alias: {
        utils: './src/utils'
      }
    },

  module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          }
        },
        {
          test: /\.handlebars$/,
          loader: "handlebars-loader"
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
          })
        }
      ]
    },

    plugins: [
      new ExtractTextPlugin("styles.css"),
    ],

    devServer: {
        contentBase: dist,
        compress: true,
        port: 3000
    }
};
