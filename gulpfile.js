/**
 * Created by Administrator on 2017/11/15.
 */

'use strict'

// 创建本地服务器 gulp-connect
// 合并文件 gulp-concat
// 最小化 css 文件 gulp-clean-css ( gulp-minify-css 已废弃）
// 最小化 js 文件 gulp-minify
// 压缩html 文件 gulp-minify-html
// 重命名文件 gulp-rename
// 压缩图像 gulp-imagemin


// 载入gulp核心包
var gulp = require('gulp'),
    less = require('gulp-less'),
    cssMinify = require('gulp-clean-css'),
    prettify = require('gulp-jsbeautifier'),
    ejs = require('gulp-ejs'),
    browserSync = require('browser-sync').create();

// 定义任务 第一个参数是任务名，第二个参数是任务执行体

// 新建html的任务
gulp.task('html', function () {
    gulp.src('src/**/*.html')
        .pipe(prettify())
        .pipe(ejs())
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({
            stream: true
        })); // 生成到根目录dist文件夹下
});

// 拷贝css的任务
gulp.task('copycss', function () {
    gulp.src('src/**/*.css')
        .pipe(cssMinify({
            advanced: false, // 类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie8',
            format: 'keep-breaks', // 类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*' // 保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// 新建 less 的任务
gulp.task('less', function () {
    gulp.src('src/**/*.less')
        .pipe(less())
        .pipe(cssMinify({
            advanced: false, // 类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie8',
            format: 'keep-breaks', // 类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*' // 保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
// 拷贝js的任务
gulp.task('copyjs', function () {
    gulp.src('src/**/*.js')
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// 拷贝image的任务
gulp.task('copyimage', function () {
    gulp.src('src/image/*')
        .pipe(gulp.dest('dist/image/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// 创建http服务器任务,默认监听8080端口
// gulp.task('serve', function () {
//     connect.server({
//         root: 'dist',
//         port: 3131,
//         livereload: true
//     });
//
//     gulp.watch('dist/index.html', ['reload']);
// });

// gulp.task('reload', function () {
//    gulp.src('dist/index.html')
//        .pipe(connect.reload());
// });

gulp.task('serve', function () {
    gulp.start('copyimage', 'html', 'copyjs', 'copycss', 'less');
    browserSync.init({
        //指定服务器启动根目录
        server: {
            baseDir: [
                'dist'
            ]
        },
        port: 3131,
        open: false
    });

    gulp.watch('src/image/*', ['copyimage']);
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/**/*.js', ['copyjs']);
    gulp.watch('src/**/*.css', ['copycss']);
    gulp.watch('src/**/*.less', ['less']);
});
// 监听所有打包之后的文件变动，自动刷新页面
gulp.task('default', ['serve']);
