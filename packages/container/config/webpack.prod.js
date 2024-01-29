//in production will gonna merge webpack.prod.js with webpack.common.js
const {merge}=require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig=require('./webpack.common');
//webpack take care of share modules for us
const packageJson = require('../package.json');

               //env var
const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
    //js that will be loaded will be minified + other optimization
    mode: 'production',
    output:{
        //this ensures that whenever we build some files for production all diferent files will that are built use this
        //as template
        filename: '[name].[contenthash].js',
        publicPath: '/container/latest/'
    },
    plugins:[
        //we need to make sure that all remote entry files url are gonna point to actually  production domain
        // (localhost domain for development webpack.config file)
        new ModuleFederationPlugin({
            name: 'container',
            remotes:{
                //we gonna asumme that remote entry file for marketing is nested inside domain marketing
                marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`
            },
            shared: packageJson.dependencies,
        })
    ]
};

module.exports = merge(commonConfig,prodConfig);