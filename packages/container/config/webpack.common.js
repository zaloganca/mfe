const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
   module:{
    rules:[
    {
        //when a file end with extension mjs or js, we wanna be processed by buble
        test: /\.m?js$/,
        exclude: /node_modules/,
        use:{
            loader: 'babel-loader',
            options:{
                presets:['@babel/preset-react','@babel/preset-env'],
                plugins:['@babel/plugin-transform-runtime']
            }
        }
    }
   ]
   },
   plugins: [new HtmlWebpackPlugin({
    template: './public/index.html',
  }),
]
}