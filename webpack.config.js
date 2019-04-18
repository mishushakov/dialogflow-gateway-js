const path = require('path')

module.exports = {
  context: path.resolve('src'),
  entry: './index.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: require.resolve('./src/index.ts'),
        use: [{
          loader: 'expose-loader',
          options: 'df'
        },
        {
          loader: 'ts-loader'
        }],
        exclude: /node_modules/
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
}