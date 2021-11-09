const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv-webpack');

module.exports = env => ({
    mode: "development",
    entry: "./src/index.tsx",
    devtool: "eval",
    output: {
        publicPath: '/',
        filename: '[name].[contenthash].js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.(css|scss)$/i,
                use: ["style-loader", "css-loader"] // Only use these to rerun sass output, "css-loader", "sass-loader"]
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".css"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            favicon: "./src/assets/favicon-32x32.png"
        }),
        new dotenv({
            path: `.${env.ENVIRONMENT}.env`
        })
    ],
    devServer: {
        historyApiFallback: true
    }
});