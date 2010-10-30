var http = require('http'),
    url = require('url'),
    mylog="log:\r\n";

function log(str) {
  mylog += str + "\r\n";
}

var server = http.createServer(function (request, response) {
  switch (url.parse(request.url).pathname) {
    case '/':
      show_form();
      break;
    case '/log':
      show_log();
      break;
    case '/clearlog':
      reset_log();
      break;
    case '/ok_case':
      okay();
      break;
    case '/failing_case':
      failure();
      break;
    default:
      show_request();
      break;
  }

  function okay() {
    log("ok_case - request(just before): ");
    setTimeout(function() {
      log('method: '+request.method);
      if(request.method=='POST') {
        log("ok_case - method POST , just define events");
        var data='';
        request.on('data', function(chunk) {  log("ok_case - on data : "+chunk.length); data += chunk; });
        request.on('end', function() {
          log("ok_case - on end"); 
          response.writeHead(200, { 'Content-Type': 'text/html'});
          response.write("ok_case - posted data: "+data);
          response.end();
        });
        log("ok_case - method POST , end define events");
      } else {
        log("ok_case - method GET"); 
        response.writeHead(200, { 'Content-Type': 'text/html'});
        response.write('ok_case - method GET');
        response.end();
     }
    },2);
  }

  function failure() {
    log("failing_case - request(just before): ");
    setTimeout(function() {
      log('method: '+request.method);
      if(request.method=='POST') {
        log("failing_case - method POST , just define events");
        var data='';
        request.on('data', function(chunk) {  log("failing_case - on data : "+chunk.length); data += chunk; });
        request.on('end', function() {
          log("failing_case - on end"); 
          response.writeHead(200, { 'Content-Type': 'text/html'});
          response.write("failing_case - posted data: "+data);
          response.end();
        });
        log("failing_case - method POST , end define events");
      } else {
        log("failing_case - method GET"); 
        response.writeHead(200, { 'Content-Type': 'text/html'});
        response.write('failing_case - method GET');
        response.end();
      }
    },50);
  }

  function show_form() {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(
      '<form action="/ok_case" method="POST">' +
      'choose file: <input type="file" name="upload-file"><br>' +
      'enter some text: <input type="text" name="description"><br>' +
      '<input type="submit" value="OK">' +
      '</form>'+
      '<form action="/failing_case" method="POST">' +
      'choose file: <input type="file" name="upload-file"><br>' +
      'enter some text: <input type="text" name="description"><br>' +
      '<input type="submit" value="Will Fail">' +
      '</form> <br><br> <a href="/log">log</a>, <a href="/clearlog">clear log</a>'
    );
    response.end();
  }

  function show_log() {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write( mylog );
    response.end();
  }

  function show_request() {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write( "the url is: "+url.parse(request.url).pathname );
    response.end();
  }

  function reset_log() {
    mylog="";
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write( "log cleared" );
    response.end();
  }

});

var old_emit = server.emit;
server.emit = function custom_emit() {
  log(arguments);
  return old_emit.apply(this, arguments);
};

server.listen(8124);

console.log('Server running at http://127.0.0.1:8124/');