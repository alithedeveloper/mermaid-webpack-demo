const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = {
  target: 'web',
  entry: {
    'index': './index.js'
  },
  externals: 'fs', // in order to make mermaid work
  output: {
    path: __dirname,
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        parser: {
          amd: false
        },
        include: /node_modules\/lodash\// // https://github.com/lodash/lodash/issues/3052
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              'transform-remove-strict-mode' // in order to make mermaid work
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].bundle.css')
  ]
}

module.exports = [config]
