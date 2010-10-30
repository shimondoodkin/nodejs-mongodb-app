var app=require('./basicapp').app; // include  basic definision of a model and a filed in a model
var _ = require('deps/nodejs-clone-extend/merger');  //  lets do: _.extend(same,otherobjexts),  _.clone(obj) - creates new reference, see source to understand // 


var app_loaded=false;
//var milliseconds = require('deps/node-microseconds/lib/node-microseconds').milliseconds;
console.log("start require modules");
if(process.argv[3])
{
 var modules=[  require(process.argv[3]) ];  // same as below but dynamicaly for testing only
}
else
{
 var modules=[  require('templates/website/pijimi_heb/modules/main'),
                require('templates/website/pijimi_heb/modules/event'), 
                require('templates/website/pijimi_heb/modules/user'), 
                require('templates/website/pijimi_heb/modules/addressbook'),
                require('templates/website/pijimi_heb/modules/distribution'),
                require('templates/website/pijimi_heb/modules/sms_buy'),
                ]
                
                ; // include  basic definision of a model and a filed in a model
}
console.log("end require modules");

//console.log(milliseconds());
//console.log('test');

console.log("starting to install modules and to setup models");
    // install modules and setup models
    for(var i =0; i < modules.length ; i++ ) modules[i].setupfirst(app);
console.log("start app.load_app_templates");
    app.load_app_templates(); 
console.log("start modules[i].setup");
    for(var i =0; i < modules.length ; i++ ) modules[i].setup(app)   ;
console.log("start app.models[i].setupfirst");
     for(var i in app.models) app.models[i].setupfirst(app);
console.log("start app.models[i].setup");
     for(var i in app.models) app.models[i].setup(app);
    // end install modules and setup models

     

     
var cookie = {
	req:null,
	get:function() { 
	 var req = this.req;
	 return (req.headers.cookie ? this.parse(req.headers.cookie) : {});
	},
	parse:function(str)	{
	    var obj = {},
	        pairs = str.split(/[;,] */);
	    for (var i = 0, len = pairs.length; i < len; ++i) {
	        var pair = pairs[i],
	            eqlIndex = pair.indexOf('='),
	            key = pair.substr(0, eqlIndex).trim().toLowerCase(),
	            val = pair.substr(++eqlIndex, pair.length).trim();
	        // Quoted values
	        if (val[0] === '"') {
	            val = val.slice(1, -1);
	        }
	        // Only assign once
	        if (obj[key] === undefined) {
	            //obj[key] = querystring.unescape(val, true);
	        	obj[key] = val;
	        }
	    }
	    return obj;
	}
};


function getuser(callback){
	var req = this;
	data = req.cookie.get();
	if (data.user_id){
		data.user_id = app.ObjectID.createFromHexString(data.user_id);
		app.models.t2_users.getall({_id:data.user_id} , function(result){ 
			if (result.length>0){
				req.user = result[0];
				callback(req.user);
			} else {
				callback(false);
			}
			
		})
	} else {
		callback(false);
	}
}

function redirect(res, url, callback, code ) {
 res.writeHead( code || 302, {'Location': url } );
 res.end();
 if(callback)callback();
};

function query_to_string(query){
	var query_string = '';
	var prefix = '?';
	for (var name in query){
		query_string+= prefix + name + '=' + query[name];
		prefix = '&';
	}
	return query_string;
}

console.log("starting extend application");

//app.milliseconds=milliseconds,
  app.init=function(db, callback)
  {
  setTimeout(function (){
    app.setupDb(db, function() {

     //  last install modules and setup models
     for(var i in app.models) app.models[i].setuplast(app);
     for(var i =0; i < modules.length ; i++ ) modules[i].setuplast(app) ;
     app.setuppages();
     // end last install modules and setup models
    
    callback(); 
    
    } );   
    //    this.setupWebSocket();
    //this.addAllMetrics(db);
    },300);
  };
  
  app.setupDb=function(db, callback) {
    
    // simple version:
    // db.createCollection('visits', function(err, collection)
    // {
    //  db.collection('visits', function(err, collection)
    //  {
    //    model.collection = collection;  callback();   });  });
    var arrmodels=[],key;
    for(key in app.models)
    {
     app.models[key].modelname=key;
     arrmodels.push(app.models[key]);
    }
    
    
    // chained version:
    app.step(
     function ()
     {
      var newgroup = this.group();
      arrmodels.forEach(function (model)
      {
       var ret_group_item=newgroup();
       //console.log('create collection: app.models.'+model.modelname+'.collection = '+model.general.name);
       db.collection
       (
        model.general.name
         ,
        function(err, collection)
        {
         //console.log('collection created!');
         model.collection = collection;
         ret_group_item(null,true);         
        }
       );
      });
     },
     function (err, contents)
     {
      //if (err) { throw err; }
      callback();
     }
    );
  };
  
  app.dynamicallyCreateServerHandlerFunction=function ()
  {
   return function (req,res)
   {
    if (req.method==='POST')
    {
     app.httputils.realpost(req,res,function (querydata)
     {
      //req.post=querydata;
      app.serveRequest(req,res);
     });
    }
    else
    {
     app.serveRequest(req,res);    
    }
   }
  };
  
  app.extendrequest=function (req)
  {
   req.cookie = cookie;
   req.cookie.req = req;
   req.user = null;
   req.getuser = getuser;
   req.redirect = redirect;
   req.query_to_string = query_to_string;
   /*
   
   req.sessions={}
   req.sessions.req=req;
   req.sessions.save=session.save;
   */
  };
  
  app.serveRequest=function(req, res, newi) // rename to route
  {
   this.extendrequest(req);
   var shared={ 'req':req, 'res':res, 'app':app, 'pages':app.pages ,'libs':app.libs };

   app.httputils.get_user(req);
   if(!app_loaded)
   {
    process.on('uncaughtException', function (err) { 
      console.log('Caught exception: ' + err.stack);
    });
    app_loaded=true;
   }

   try
   {
    if (!req.parsedurl)
    {
     req.parsedurl=app.url.parse(req.url,true);
     if(!req.parsedurl.pathname) req.parsedurl={pathname:'error_in_url'};
     if(!req.parsedurl.query)req.parsedurl.query={};
     //console.log(req.parsedurl.pathname);
     //console.log(decodeURIComponent(req.parsedurl.pathname));
     
     if(req.parsedurl && req.parsedurl.pathname)req.parsedurl.pathname=decodeURIComponent(req.parsedurl.pathname.replace(/\+/g, '%20'));
     //req.times=[];
     //req.times_start=milliseconds();
     //req.times.push(milliseconds()-req.times_start);
    }
    //console.log(' serveRequest '+newi);
    if(!newi) newi=0;
    
    var myurl=req.parsedurl;
    var urlmatch=false;

    
    for(var i=newi;i<app.url_routes.length;i++)
    {
     //console.log(' serveRequest loop '+i);
     urlmatch=false;
     if(app.url_routes[i].path=='default') continue; //add defaut  at the end
     if(typeof app.url_routes[i].pathbegins!='undefined')
     {
      if( myurl.pathname.substring(0,app.url_routes[i].pathbegins.length)==app.url_routes[i].pathbegins )
      {
       urlmatch=true;
       //console.log("match: "+app.url_routes[i].pathbegins);
      }
     }
     else if(typeof app.url_routes[i].path!='undefined')
     {
      if(myurl.pathname==app.url_routes[i].path)
      {
       urlmatch=true;
       //console.log("match: "+app.url_routes[i].path);
      }
     }
     if(urlmatch)
     {
      if(typeof app.url_routes[i].func!='undefined')
      {
       if(app.url_routes[i].func(data,settings,res,req,myurl))
        return true; // true means break the preview function
       else urlmatch=false;
      }
      if(typeof app.url_routes[i].page!='undefined')
      {
        /*
        //var req2=req,res2=res;
        setTimeout(function(){
        app.httputils.post(req,res,function (querydata){
              console.log("success"); 
              res.writeHead(200, { 'Content-Type': 'text/html'});
              res.write(app.sys.inspect(querydata));
              res.end();
        });},530);
        return true;*/
       shared.page=app.url_routes[i].page;
       if(app.url_routes[i].page.main( shared, /* req, res, app.url_routes[i].page*/ i ))
       {
        return true; // true means break the preview function
       }
       else urlmatch=false;
      }
      else if(typeof app.url_routes[i].code!='undefined')
      {
       var ftext=app.url_routes[i].code.toString();
       ftext=ftext.substring(ftext.indexOf('{')+1,ftext.lastIndexOf('}'));
       eval(ftext);
      }
      //if(typeof app.url_routes[i].dontbreak=='undefined')  myswitch += 'break;';
      //else if(app.url_routes[i].dontbreak==false)  myswitch += 'break;';
     }
    }
    
    
    if(!urlmatch)
    {
     console.log("not found: "+req.parsedurl.pathname);
     //app.urls[0][1][app.urls[0][2]](req, res);
     res.writeHead(202, { 'Content-Type': 'text/html'});
     res.write("<html><head><title>Unhandeld request</title></head><body>hendle request (req, res) \r\n did not match any url: \r\n "+req.parsedurl.pathname+" \r\n<br\ > <a href='/'>click here</a> to go to the main page</body></html>");
     res.end();
    }
    }
    catch(error)
    {
     console.log("error: "+req.parsedurl.pathname);
     //app.urls[0][1][app.urls[0][2]](req, res);
     res.writeHead(202, { 'Content-Type': 'text/html'});
     res.write("<html><head><title>Server Error</title></head><body>Server Error in Handle Request (url: "+req.parsedurl.pathname+"): \r\n  <pre>"+error.stack+"</pre> \r\n<br\ > <a href='/'>click here</a> to go to the main page</body></html>");
     res.end();
    }
  };


/*
  app.setupWebSocket=function()
  {
    // Websocket TCP server
    var wsServer = ws.createServer({log: false});
    wsServer.listen(config.websocket_port);

    wsServer.addListener("connection", function (conn) {
      console.log("ws connect: " + conn._id);
      conn.addListener("close", function () {
        console.log("ws close: " + conn._id);
      });
    });

    this.wsServer = wsServer;

    console.log('Web Socket server running at ws://*:' + app.websocket_port);
  };


  app.addAllMetrics=function(db) {
    var self = this;

    Metric.allMetrics(function(metric) {
      metric.init(db);
      metric.wsServer = self.wsServer;
      self.metrics.push(metric);
    });
  };
*/