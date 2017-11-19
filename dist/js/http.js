/**
 * Created by Administrator on 2017/11/19.
 */
var http = require('http');

http
    .createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('hello Node.js');
        res.end();
    })
    .listen(2015, '127.0.0.1');
    console.log('Server running at http://127.0.0.1:2015');

