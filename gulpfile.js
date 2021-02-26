const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin")
const cssmin = require("gulp-cssmin")
const autoprefixer = require("gulp-autoprefixer")
const uglify = require("gulp-uglify")
const del = require("del")
// 引入 gulp-webserver
const webserver = require('gulp-webserver')

const htmlHander = () => {
    return gulp.src("./src/html/*.html")
        .pipe(htmlmin({
            removeAttributeQuotes: true, //移除属性上的双引号
            removeComments: true, //移除注释
            collapseWhitespace: true, //移除所有空格,会变成一行代码
            minifyCSS: true, //把页面里面style标签里面的css样式也去空格
            minifyJS: true, //把页面里面script标签里面的js代码也去空格
            collapseBooleanAttributes: true //把值为布尔值的属性简写
        }))
        .pipe(gulp.dest("./dist/html"))
}
// const libHandler = () => {
//     return gulp.src("./src/lib/*.js")
//         .pipe(gulp.dest("./dist/lib"))
// }
// php
const phpHandler = () => {
    return gulp.src("./src/php/*.php")
        .pipe(gulp.dest("./dist/php"))
}
// font
const fontHandler = () => {
    return gulp.src("./src/font/*.*")
        .pipe(gulp.dest("./dist/font"))
}
// images
const imagesHandler = () => {
    return gulp.src("./src/images/*.*")
        .pipe(gulp.dest("./dist/images"))
}
const cssHandler = () => {
    return gulp.src("./src/css/*.css")
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(gulp.dest("./dist/css"))
}
const jsHandler = () => {
    return gulp.src("./src/js/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("./dist/js"))
}
const delHandler = () => {
    return del(['./dist'])
}
const webserverHandler = () => {
    return gulp.src("./dist") //找到要作为服务器根目录的文件夹
        .pipe(webserver({
            host: "localhost",
            port: 8080, //端口号,0-65535之间,尽量不要用0-1023
            open: "./html/index.html", //你默认打开的首页,路径从dist开始书写
            livereload: true, //热更新,就是当dist里面代码有变化的时候自动刷新浏览器
            proxies: [ //这个第三方模块还可以帮助我们配置代理
                //直接在使用webserver的时候添加一个配置项:   proxies:[]
                {
                    source: '/abc', //表示请求的地址
                    target: 'https://captcha.fengkongcloud.com/ca/v1/register' //你要代理的地址
                },
                {
                    source: '/eee', //表示请求的地址
                    target: 'http://127.0.0.1/json.php' //你要代理的地址
                }
            ]


        }))
}
//书写自动监控任务
const watchHandler = () => {
    /*
        当我在src里面书写代码的时候,只要我修改我的代码,就会被gulp监听到,
        一旦监听到,就重新帮我删除以前的和压缩现在的,一旦压缩,dist文件夹里面内容就变化了
        变化了以后服务器就会热更新
    */
    gulp.watch('./src/css/*.css', cssHandler);
    gulp.watch('./src/js/*.js', jsHandler);
    gulp.watch('./src/html/*.html', htmlHander);
    // gulp.watch('./src/lib/*.js', libHandler)
}
// module.exports.delHandler = delHandler
// module.exports.htmlHander = htmlHander
// module.exports.libHandler = libHandler
// module.exports.cssHandler = cssHandler
// module.exports.jsHandler = jsHandler
module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(cssHandler, htmlHander, jsHandler, phpHandler, fontHandler, imagesHandler),
    webserverHandler,
    watchHandler
)