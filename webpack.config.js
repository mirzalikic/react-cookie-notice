const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index: path.join(__dirname, 'src/index.js')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            { test: /\.(js)$/, use: 'babel-loader' },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    mode: 'production',
    externals: {
        react: 'react'
    },

    plugins: [
        new CopyPlugin({
            patterns: [{ from: path.join(__dirname, 'src/index.d.ts'), to: path.join(__dirname, 'dist/index.d.ts') }]
        })
    ]
};
