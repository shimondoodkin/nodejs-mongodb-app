require.paths.unshift(__dirname); //make local paths accecible
var sys = require("sys");
var http = require('http'); // allaws to create http server
var mongo = require('deps/node-mongodb-native/lib/mongodb'); 
var _ = require("deps/nodejs-clone-extend/merger");

var smsquee=[]; // new Array();
function sendsms(users,message,callback)
{
 var smsobject={}; // create new empty object
 smsobject.users=users;
 smsobject.message=message;
 
 callback('Thanks for testing');
}

function testsms()
{
 for(var i=0;i<smsquee.length;i++)
 {
  
 }  
}

function handlerequest(request, response)
{
 switch (url.parse(request.url).pathname)
 {
  case '/':
    //show form
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write
    (
      '<form action="/test" method="GET">' +
      '<input type="submit" name="submit" value="Test">' +
      '<input type="hidden" name="rand"   value="'+Math.random()+'">' +
      '</form>'
    );
    response.end();
    break;
  case '/test':
    
    var phonenumbers=[];
    phonenumbers.push({name:'shimon',phone:'972547490305'});
    //phonenumbers.push({name:'alex',phone:'972545557456'});
    
    var message={
     text: (new Date).toString()+ 'בדיקת SMS' ,
     link: 'http://google.com/'
    };
    
    sendsms(phonenumbers, message, function (ret_value){
     response.writeHead(200, {'Content-Type': 'text/plain'});
     response.write(
      ret_value +
      '<form action="/test" method="GET">' +
       '<input type="submit" value="Test Again">' +
       '<input type="hidden" name="rand"   value="'+Math.random()+'">' +       
      '</form>'
     );
     response.end();
    });
    
    
    
    break;
  default:
    //show 404
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('404 - Please try again.');
    response.end();
    break;
 }
}



var db = new mongo.Db('webappdb', new mongo.Server('127.0.0.1', mongo.Connection.DEFAULT_PORT , {}), {});
var httpserver;
db.open(function(err, db)
{
  httpserver=http.createServer(handlerequest);
  httpserver.listen(8124);
  setTimeout(testsms,3000);
});

var autoexit_watch=require('deps/nodejs-autorestart/autoexit').watch;
autoexit_watch(__dirname,".js");