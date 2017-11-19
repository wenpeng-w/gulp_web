/**
 * Created by Administrator on 2017/11/19.
 */
var http = require('http');
// var Promise = require('Promise');
var cheerio = require('cheerio');
var url = 'http://huaban.com/all/';

function filterChapters(html) {
    var $ = cheerio.load(html);
    var photos = $('.page-min-width');
    var courseData = [];
    console.log('1')
    console.log(photos.children().length)
    photos.each(function () {
        var photo = $(this);

        var imgaes = photo.find('.wft');
        var photoData = {
            images: []
        }
        imgaes.each(function (item) {
            var image = $(this);
            console.log('3')
            var imageUrl = image.find('.img img').attr('src');
            var desc = image.find('.description').text();
            photoData.images.push({
                imageUrl: imageUrl,
                desc: desc
            })
        })

        courseData.push(photoData);
    });
    return courseData;
};

function printCourseInfo (courseData) {
    courseData.forEach(function (item) {
        console.log('4')
        item.images.forEach(function (image) {
            console.log('5')
            console.log('-' + image.imageUrl + '\n');
            console.log(image.desc + '\n');
        })
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