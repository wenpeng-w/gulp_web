/**
 * Created by Administrator on 2017/11/19.
 */
var http = require('http');
// var Promise = require('Promise');
var cheerio = require('cheerio');
var url = 'http://www.jianshu.com/';

function filterChapters(html) {
    var $ = cheerio.load(html);
    var photos = $('.have-img');
    var courseData = [];
    console.log(photos)
    photos.each(function () {
        var photo = $(this);

        var title = photo.find('.title').text();
        var txt = photo.find('.wrap-img').find('img').attr('src');
        var photoData = {
            title: title,
            txt: txt
        }

        courseData.push(photoData);
    });
    return courseData;
};

function printCourseInfo (courseData) {
    courseData.forEach(function (item) {
        var title = item.title;
        var txt = item.txt;

        console.log(title + '\n');
        console.log(txt + '\n');
    })
};

http.get(url, function (res) {
    var html = '';

    res.on('data', function (data) {
        html += data;
    });

    res.on('end', function () {
        var courseData = filterChapters(html);
        printCourseInfo(courseData);
    });
}).on('error', function () {
    console.log('获取数据失败!');
});