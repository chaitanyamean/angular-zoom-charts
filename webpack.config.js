const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: './node_modules/@dvsl/zoomcharts/lib/assets',
                to: 'assets'
            }
        ])
    ]
};