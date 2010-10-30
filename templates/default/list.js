this.page=function(app,model)
{
 var page=
     {
      //pagethis:this,
      //pagearguments:arguments,
      pagefilename:__filename,
       //'model':model,
      pageurl:'/list.jsp',
       // add error on existing function       
       load_templates:  // strings treated as template filenames to load and prepeare
       {
        list:"default/list.html",
       }, 
       // will be here: this.list=function(){...
       
       prepeare_templates:  // function treated as templates to prepeare
       {
        //template2:function (vars){var echo=""; echo+=... return echo;}, 
       },
       // will be here: this.template2=function(){...

       // to load more templates from templates , use:
       //    this.load('listgrid','paritials/listgrid.html');
       //    this.listgrid({'data1':data});
       
       prepere_data:function (page,template_name,callback)
       {
          var data1={'page':page, 'app':app, 'req':{}, }         
          app.fake_load_data(
           {
            'list': {  model:page.model  , column_set:'list' , where:null,  load_items:true,   load_subitems:false   },
           }
          ,
           data1
          ,
          function ()
          { 
            callback(data1);
          });
       },
       
       main:function (shared,route_i)
       {
        var req=shared.req,res=shared.res,page=shared.page;
      
        //var currentpage=request.querystring['page']
         if(false) //req.parsedurl.query['_id']
         {
           //res.writeHead(200, { 'Content-Type': 'text/html'});
           //data1={'page':page,'app':app,'content':'No ID' + sys.inspect(req.parsedurl) + sys.inspect(app.ObjectID.createFromHexString(req.parsedurl.query['_id'])) };
           //res.write( page.content.call(page,data1) );
           ///res.end();
           sys.puts('imposible false');
         }
         else
         {
          var data1={'page':page, 'app':app, 'req':req, }         
          app.load_data(
           {
            'list': {  model:page.model  , column_set:'list' , where:null,  load_items:true,   load_subitems:false   },
            //'user':     {  model:app.models.t2_users      , column_set:'view'  , where:null            ,  load_items:false,  load_subitems:true    },
           }
          ,
           data1
          ,
           function ()
           {
             var header= { 'Content-Type': 'text/html'};
             //app.httputils.session_start(req,header);             
             res.writeHead(200, header);
             //res.write(sys.inspect(   data1 ));        
             res.write( page.list.call(page,data1) );
             res.end();
             //sys.puts(sys.inspect(   data1 ));
           }
          );
        }
        return true;
       },
      };
      
      
 
 return page; 
} ;
 
