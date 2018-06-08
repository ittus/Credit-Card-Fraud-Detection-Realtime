const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './index.html',
        to: './'
      },
      {
        from: './style/*',
        to: './'
      },
    ])
  ]
};
