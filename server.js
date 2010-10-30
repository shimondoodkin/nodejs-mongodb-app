console.log("starting server");
// process.argv[2] = other port (optional)
// process.argv[3] = other db (optional)
// process.argv[4] = other main module (optional), modules should be specified staticaly static or by file list  but anyways i have my proprietery website and and the example i want them both running so ican share good examples

if(process.argv[2])console.log("port "+process.argv[2]);
if(process.argv[3])console.log("server "+process.argv[3]);
if(process.argv[4])console.log("testing module "+process.argv[4]);

require.paths.unshift(__dirname); //make local paths accecible
//  require('filename')  // include file - filename is without '.js' extention!!!

var sys = require('sys');   // allaws to write to application streams (write to log)
var http = require('http'); // allaws to create http server
var mongo = require('deps/node-mongodb-native/lib/mongodb'); 
var app = require('basicapp').app;


console.log("start require modules");

if(process.argv[4])
{
 var modules=[  require(process.argv[4]) ];  // same as below but dynamicaly for testing only
}
else
{
 var modules=[  require('templates/website/pijimi_heb/modules/main'),
                require('templates/website/pijimi_heb/modules/event'), 
                require('templates/website/pijimi_heb/modules/user'), 
                require('templates/website/pijimi_heb/modules/addressbook'),
                require('templates/website/pijimi_heb/modules/distribution'),
                require('templates/website/pijimi_heb/modules/sms_buy')]; // include  basic definision of a model and a filed in a model
}

app.init_first(modules);

console.log("end require modules");

if(process.argv[3]) app.database.name=process.argv[3];
if(process.argv[2]) app.server.port=parseInt(process.argv[2]);

db = new mongo.Db( app.database.name, new mongo.Server( app.database.host, app.database.port, {}), {});
db.addListener("error", function(error) { sys.puts("Error connecting to mongo -- perhaps it isn't running?"); process.exit(-1); });

function db_open_auth(callback)
{
 if(app.database.username)
 {
  db.open(function(p_db)
  {
   p_db.authenticate(app.database.username, app.database.password, function(err, replies) {
     if(err) throw  err;
     callback(p_db);
   });
  });
 }
 else
 {
  db.open(function(p_db)
  {
    callback(p_db);
  });
 }
}

db_open_auth(function(p_db)
{
  console.log("connected to database");
  app.init(db,modules,
  function()
  {
   console.log('app init finished');
   var server_handler_function=app.dynamicallyCreateServerHandlerFunction();
   http.createServer(server_handler_function).listen(app.server.port);
   console.log((new Date).toTimeString()+' Server running at http://127.0.0.1:'+app.server.port+'/');
  });
});


// exit if any js file or template file is changed.
// this script encapsualated in a batch while(true); so it runs again after exit.
//var autoexit_watch=require('deps/nodejs-autorestart/autoexit').watch;
//autoexit_watch(__dirname,".js");
//autoexit_watch(__dirname+"/templates",".html");
//autoexit_watch(__dirname+"/templates",".css");
//loadlater(__dirname + "/invite.js");
