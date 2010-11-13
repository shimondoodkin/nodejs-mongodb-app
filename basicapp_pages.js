this.main=function(app)
{

  app.pages=
  {
   admin           :require('templates/default/default').page.call(app,app), 
   website_default :require('templates/website/default').page.call(app,app), 
   favicon         :require('cachedfile_page'  ).page.call(app,app,'favicon.ico','favicon.ico'), 
   jquery          :require('cachedfolder_page').page.call(app,app,'lib/jquery','deps/jquery',false,/(^development-bundle)|jquery-validate\\lib|demo/),
   ckeditor        :require('cachedfolder_page').page.call(app,app,'lib/ckeditor','deps/ckeditor',/\.(js|html|gif|png|jpg|ico|css)$/,/(^\.)|(^_)|(\.\/)|(\.svn)/),
   slickgrid       :require('cachedfolder_page').page.call(app,app,'lib/slickgrid','deps/SlickGrid',/\.(js|html|gif|png|jpg|ico|css)$/,/MIT-LICENSE.txt|tests|build|\.git/),
   datejs          :require('cachedfolder_page').page.call(app,app,'lib/datejs','deps/datejs',/\.(js|html|gif|png|jpg|ico|css)$/,/LICENSE.txt|README.txt|CHANGELOG.txt|TODO.txt|tests|\.git/),
   date            :require('cachedfolder_page').page.call(app,app,'lib/date','deps/date',/\.(js|html|gif|png|jpg|ico|css)$/,/LICENSE.txt|README.txt|CHANGELOG.txt|TODO.txt|tests|\.git/),
  };
  
  app.setuppages=function(callback)
  {
   //add some more other non page routes
   app.url_routes.push({path:'/exit',code:function(req,res,page,request_i){res.writeHead(200, { 'Content-Type': 'text/plain'});res.write('exit');res.end();process.nextTick(function () {process.exit();});}});
   
   var p,tempalte_name,template_function;
   for(p in this.pages)
   {
    if(this.pages.hasOwnProperty(p) )
    {
     var page=this.pages[p];
     //add .model reference to page
     app.doubletemplate.load_templates(page);
    }
   }
   // adlater calling route before, route after
   for(p in this.pages)
   {
    if(this.pages.hasOwnProperty(p) )
    {
     var pageurl='/'+this.pages[p].pageurl;
     var amatch={page:this.pages[p]};
     if(this.pages[p].urlmatch)
     {
      //sys.puts(this.pages[p].urlmatch+"="+pageurl);
      amatch[this.pages[p].urlmatch]=pageurl;
     }
     else
      amatch['path']=pageurl;
     //app.url_routes.push({path:pageurl,code:function(req,res,page,request_i){res.writeHead(200, { 'Content-Type': 'text/plain'});res.write('hello world');res.end();}});
     app.url_routes.push(amatch);
    }
   }
   
   if(callback)callback(callback);
  }
   
  app.watchpage = function(pagename,filename)
  {
   var watch_arr=[];
   for(k in app.pages[pagename].load_templates)
   {
    if(app.pages[pagename].load_templates.hasOwnProperty (k))
    {
     watch_arr.push('templates/'+app.pages[pagename].load_templates[k]);
    }
   }
   watch_arr.push(filename);

   app.autoreload.watchrel(watch_arr,filename, function (newmodule)
   {
    var oldpage=app.pages[pagename];
    var page=newmodule.page.apply(oldpage.pagethis?oldpage.pagethis:app,oldpage.pagearguments?oldpage.pagearguments:[app]);
    app.doubletemplate.load_templates(page,function ()
    {
     app.pages[pagename]=page; // update main page reference
     
     for(var i=0;i<app.url_routes.length;i++) // serch routes and update routes
     {
      if(app.url_routes[i].page)
      if(app.url_routes[i].page.pagefilename==oldpage.pagefilename)
      {
       app.url_routes[i].page=page;
       /*
       if(oldpage.urlmatch)
        delete app.url_routes[i][oldpage.urlmatch];
       else 
        delete app.url_routes[i]['path'];

       if(page.urlmatch)
        app.url_routes[i][page.urlmatch]=page.pageurl;
       else
        app.url_routes[i]['path']=page.pageurl;
        */
       console.log( (new Date).toTimeString() + ' page ' + i + ' reloaded ' + filename );
      }
     }
    }); 
    // route update here
   }); 
  }
}