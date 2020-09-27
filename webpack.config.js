var path = require('path');

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
    }
};
