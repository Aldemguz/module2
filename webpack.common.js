var path = require('path');
var webpack = require('webpack');

module.exports = (env, mode = "") => ({
    entry: ['./src/main/js/index.js'],
    output: {
        path: __dirname,
        filename: './target/classes/static/built/bundle.js'
    },
    resolve: {
        alias: {
            bucares: path.resolve('src/main/js'),
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                loader: "babel-loader",
                options: {
                    cacheDirectory: true
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'env': {
                'VERSION': JSON.stringify(env && env.version ? env.version : '0-SNAPSHOT'),
                'MODE': JSON.stringify(mode)
            }
        })
    ]
});