//in production will gonna merge webpack.prod.js with webpack.common.js
const {merge}=require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig=require('./webpack.common');
//webpack take care of share modules for us
const packageJson = require('../package.json');

const prodConfig = {
    //js that will be loaded will be minified + other optimization
    mode: 'production',
    output:{
        //this ensures that whenever we build some files for production all diferent files will that are built use this
        //as template
        filename: '[name].[contenthash].js',
        publicPath: '/marketing/latest/',
    },
    plugins:[
        new ModuleFederationPlugin({
            name: 'marketing',
            filename: 'remoteEntry.js',
            exposes:{
                './MarketingApp':'./src/bootstrap'
            },
           
            shared: packageJson.dependencies,
        })
    ]
};

module.exports = merge(commonConfig,prodConfig);