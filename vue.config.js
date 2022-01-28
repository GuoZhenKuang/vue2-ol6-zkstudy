/*
 * @Author: 阿匡
 * @Date: 2022-01-10 15:59:03
 * @LastEditTime: 2022-01-28 14:48:35
 * @LastEditors: 阿匡
 * @Description: 配置文件
 * @FilePath: \vue2-ol-zkstudy\vue.config.js
 * @仅为学习使用
 */
const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const cesiumSource = './node_modules/cesium/Source'
function resolve(dir) {
return path.join(__dirname, dir);
}
module.exports = {
    lintOnSave: false,
    devServer:{
        open:true,
        hot:true
    },
    configureWebpack:{
        output:{
            sourcePrefix:''//1让webpack正确处理多行字符串配置amd参数
        },
        amd:{
            toUrlUndefined:true//2webpack在cesium中能友好的使用require
        },
        resolve:{
            extensions: ['.js', '.vue', '.json'],
            alias: {
                'cesium': path.resolve(__dirname, cesiumSource) // 3 定义别名cesium后，cesium代表了cesiumSource的文件路径，此处配置好后，就在main.js中直接使用cesium引入资源
                }
        },
        plugins:[
            //4存放插件
            new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Workers'), to: 'Workers' }]),
            new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Assets'), to: 'Assets' }]),
            new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }]),
            new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'ThirdParty/Workers'), to: 'ThirdParty/Workers' }]),
            new webpack.DefinePlugin({ 
                //5 自定义插件
                CESIUM_BASE_URL: JSON.stringify('./')
              })
        ],
        module:{
            // unknownContextRegExp: /^.\/.*$/,
            unknownContextCritical: false, // 6 不让webpack打印载入特定库时候的警告
            //7解决./node_modules/cesium/Source/ThirdParty/zip.js
            rules: [
                {
                test: /\.js$/,
                use: {
                loader: '@open-wc/webpack-import-meta-loader',
                },
                },
            ]
        }
    },
    productionSourceMap:true
}