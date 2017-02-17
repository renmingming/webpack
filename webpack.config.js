/**
 * Created by Administrator on 2017/2/16 0016.
 */
var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path')

module.exports = {
    context: __dirname, // 指定路径
    entry: './src/app.js', // 入口
    output: {
        path: './dist', // 打包后的路径
        filename: 'js/[name].bundle.js', // 打包后的名称
        // publicPath: 'http://cdn.com/' // 上线的地址
    },
    module: {
        // webpack2 的方式rules、use  webpack1用loaders
        loaders: [
          // es6 js 转换成浏览器可以识别的
          {
              test: /\.js$/,
              // webpack1方式
              loader: 'babel-loader',
              include: path.resolve(__dirname, 'src'), // 打包范围
              exclude: path.resolve(__dirname, 'node_modules'), // path.resolve把他解析成绝对路径    打包时不读这个文件，费时
              query: {
                  presets: ['latest']
              }
              // webpack2方式
              /*use: {
                  loader: 'babel-loader',
                  include: path.resolve(__dirname, 'src'), // 打包范围
                  exclude: path.resolve(__dirname, 'node_modules'),
                  query: {
                      presets: ['latest']
                  }
              }*/
          },
          {
              // 处理css文件
              test: /\.css$/,
              // loader: 'style-loader!css-loader!postcss-loader' //执行顺序从后向前
              // webpack2 的方式
              loaders: [
                  'style-loader',
                  //'css-loader?importLoaders=1',
                  //'postcss-loader'
                  // webpack2 方式
                  {
                      loader: 'css-loader',
                      options: {
                          importLoaders: 1
                      }
                  },
                  // 'css-loader?importLoaders=1', //?importLoaders=1处理css中@impoort进来的css文件
                  {
                     loader: 'postcss-loader',
                  //    // webpack2 插件配置
                  //    options: {
                  //        plugins: function() {
                  //            return [
                  //                require('autoprefixer')
                  //            ]
                  //        }
                  //    }
                  }
              ]
          },
            {
                test: /\.less$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                // 处理图片
                test: /\.(png|jpg|gif|svg)/,
               /* loader: 'url-loader', // file-loader
                query: {
                    limit: 2000, //url-loader的limit指定图片或文件小于2000的时候转换为base64,大于的话通过file-loader处理
                    name: 'assets/[name]-[hash:5].[ext]' // 指定位置   ext后缀名
                }*/
                loaders: [
                    {
                        loader: 'url-loader',
                        query: {
                            limit: 1000,
                            name: 'assets/[name]-[hash:5].[ext]'
                        }
                    },
                    'image-webpack-loader'
                ]
            }
      ]
    },
    // autoprefixer是postcss中的插件 webpack1的方式
    /* postcss: () => {
         return [
             require('autoprefixer')({ // autoprefixer给css加前缀
                 broswers: ['last 5 versions'] // 对指定浏览器版本
             })
         ]
     },*/
    plugins: [
       // 获取main.js不带publicPath上线的http路径并将js插入html中
        // <%= compilation.assets[htmlWebpackPlugin.files.chunks.main.entry.substr(htmlWebpackPlugin.files.publicPath.length)].source() %>
        new htmlWebpackPlugin({
            //filename:指定输出名字
            template: 'index.html',
            inject: 'body', // script标签放在head中
            //title: 'webpack is goods', 在html中这样引用<%= htmlWebpackPlugin.options.title %>
            //date: new Date(),
           // chunks: ['main', 'a'], // 生产的html中包含的chunk  smain、a
           // excludeChunks: ['b', 'c'], // 生产的html中包含的chunks中排出entry里的b、c
           // minify: { // 对当前html文件进行压缩
            //     collapseWhitespace: true, // 删除空格
            // }
        })
    ]
}