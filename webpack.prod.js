//const path = require('path');
import path from 'path'
//import ExtractTextPlugin from 'extract-text-webpack-plugin'

module.exports = {
  mode: 'development',
  entry: { 'main': './wwwroot/source/app.js' },
  output: {
    path: path.resolve(__dirname, 'wwwroot/dist'),
    filename: 'bundle.js',
    publicPath: 'dist/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              '@babel/preset-env'
            ]
          }
        }
      },
      {
        test: /\.css/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js"), //这是之前单独打包出来的react、react-dom等文件
    //new ExtractTextPlugin("app.css"), // 将所有sass/css文件打包成一个index.css文件
    new webpack.DefinePlugin({
        "process.env": { 
            NODE_ENV: JSON.stringify("production") 
        }
    }),
    new webpack.optimize.UglifyJsPlugin({ // 压缩打包后的代码
        compress: {
            warnings: false
        }
    })
  ]
};