
const path = require('path');

function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath:'./',
    devServer: {
        port: 3000, // 端口
        proxy:{
            '/api':{
                target: 'http:localhost:5000/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }

    },
    lintOnSave: false, // eslint-loader 是否在保存的时候检查
    productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
    filenameHashing: true, //文件hash
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
}
