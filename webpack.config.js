const path = require('path')

module.exports = {
    context: path.resolve('./'),
    entry: './src/index.ts',
    mode: 'production',
    optimization: {
        minimize: true
    },
    module: {
        rules: [{
            test: require.resolve('./src/index.ts'),
            use: [{
                loader: 'expose-loader',
                options: 'df'
            },
            {
                loader: 'ts-loader'
            }],
            exclude: /node_modules/
        }]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    }
}