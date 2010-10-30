var fs = require('fs');    // allaws to open files
var http = require('http');    // allaws to open files
var Buffer = require('buffer').Buffer;    // allaws to open files
var gif;
fs.readFile(__filename,function (err, data)
{
 if (err) throw err;
  gif = data;
});

http.createServer(function (req, res)
{
 res.writeHead(200, {'Content-Type' : 'text/plain'});
 req.setEncoding('binary');
 res.write(gif);
 res.end();
 // Do db magic after the request is sent.
}).listen(91);