this.main=function (app)
{

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
  
  var app_loaded=false;  
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
      if(app.url_routes[i].pathbegins) console.log('match - path begins : '+app.url_routes[i].pathbegins);
      else if(app.url_routes[i].path)  console.log('match - path : '       +app.url_routes[i].path);
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
     res.writeHead(202, { 'Content-Type': 'text/html;charset:utf-8'});
     res.write("<html><head><title>Unhandeld request</title></head><body>Unhandeld request \r\n the url: \r\n "+req.parsedurl.pathname+" \r\n did not matched any handler<br\ > <a href='/'>click here</a> to go to the main page</body></html>");
     res.end();
    }
    }
    catch(error)
    {
     console.log("error: "+req.parsedurl.pathname);
     //app.urls[0][1][app.urls[0][2]](req, res);
     res.writeHead(202, { 'Content-Type': 'text/html;charset:utf-8'});
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

}