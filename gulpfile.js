/**
 * Created by Administrator on 2017/11/15.
 */

'use strict'

// 创建本地服务器 gulp-connect
// 合并文件 gulp-concat
// 最小化 css 文件 gulp-minify-css
// 最小化 js 文件 gulp-minify
// 压缩html 文件 gulp-minify-html
// 重命名文件 gulp-rename
// 压缩图像 gulp-imagemin


// 载入gulp核心包
var gulp = require('gulp');
var less = require('gulp-less');
var connect = require('gulp-connect');

// 定义任务 第一个参数是任务名，第二个参数是任务执行体

// 新建html的任务
gulp.task('html', function () {
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist/')) // 生成到根目录dist文件夹下
        .pipe(connect.reload());
});

gulp.task('autohtml', function () {
    gulp.watch('src/**/*.html', ['html']);
});

// 拷贝css的任务
gulp.task('copycss', function () {
    gulp.src('src/**/*.css')
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
});

// 拷贝image的任务
gulp.task('copyimage', function () {
    gulp.src('src/image/*')
        .pipe(gulp.dest('dist/image/'));
});

gulp.task('autoimage', function () {
    gulp.watch('src/image/*', ['copyimage']);
});

// 新建css的任务
gulp.task('less', function () {
    gulp.src('src/**/*.less')
        .pipe(less())  // 编译less文件
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
});

gulp.task('autocss', function () {
    gulp.watch('src/**/*.less', ['less']);
});

// 创建http服务器任务,默认监听8080端口
gulp.task('serve', function () {
    connect.server({
        root: 'dist',
        port: 3131,
        livereload: true
    });

    gulp.watch('dist/index.html', ['reload']);
});

gulp.task('reload', function () {
   gulp.src('dist/index.html')
       .pipe(connect.reload());
});

// 监听所有打包之后的文件变动，自动刷新页面
gulp.task('default', ['autohtml', 'autocss', 'copycss', 'autoimage', 'serve']);
