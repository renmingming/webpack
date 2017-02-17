/**
 * Created by Administrator on 2017/2/17 0017.
 */
//postcss-loader的插件配置
module.exports = {
    plugins:  [
            require('autoprefixer')({ // autoprefixer给css加前缀
                browsers: ["last 5 versions"]  //对指定浏览器版本
            })
        ]
}