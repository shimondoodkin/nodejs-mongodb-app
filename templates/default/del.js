var sys=require('sys');

this.page=function(app,model)
{
 var page=
     {
       //pagethis:this,
       //pagearguments:arguments,
       pagefilename:__filename,
       pageurl:'/del.jsp',
       // add error on existing function       
       load_templates:  // strings treated as template filenames to load and prepeare
       {
        del:"default/del.html",
        content:"default/content.html",
       }, 
       // will be here: this.add=function(){...
       
       prepeare_templates:  // function treated as templates to prepeare
       {
        //template2:function (vars){var echo=""; echo+=... return echo;}, 
       },
       // will be here: this.template2=function(){...

       // to load more templates from templates , use:
       //    this.load('addgrid','paritials/addgrid.html');
       //    this.addgrid({'data1':data});
       
       prepere_data:function (page,template_name,callback)
       {
          var data1={'page':page, 'app':app, 'req':{}, }         
          app.fake_load_data(
           {
            'del': {  model:page.model  , column_set:'list' , where:null,  load_items:true,   load_subitems:false   },
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
        if(req.method==='POST')
        {
         app.httputils.post(req,res,function (data)
         {
          var updateok=false;
          if(data)
          {
           if(data['model_del'])
           {
            if(data['model_del']._id)
            {

             var where={'_id':app.ObjectID.createFromHexString(data['model_del']['_id'])};
             delete data['model_del']['_id'];
             // sys.puts( sys.inspect(where)); 
             page.model.remove(where,function (where ,datawithkey)
             {
              //sys.puts( sys.inspect(where)); 
              updateok=true; 
              app.httputils.redirect(req,res,'/'+page.model.general.urlprefix+page.model.pages.list.pageurl);
             });
             
             if(!updateok)
             {
              res.writeHead(200, { 'Content-Type': 'text/html'});        
              data1={'page':page,'app':app, 'content': sys.inspect(where) };
              page.content.call(page,data1,function(echo){res.write(echo);res.end(); });
             }
             return;
            }
           }
          }
          
          res.writeHead(200, { 'Content-Type': 'text/html'});
          data1={'page':page,'app':app,'content':'לא התקבל ID' + sys.inspect(data) };
          page.content.call(page,data1,function(echo){res.write(echo);res.end(); });

         });
        }
        else
        {
         if(req.parsedurl.query['_id'])
         {
         
         
          var data1={'page':page, 'app':app, 'req':req, }         
          app.load_data(
           {
            'del': {  model:page.model                      , column_set:'list' , where:{'_id':app.ObjectID.createFromHexString(req.parsedurl.query['_id'])},  load_items:true,   load_subitems:false   },
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
             page.del.call(page,data1,function(echo){res.write(echo);res.end(); });
             //sys.puts(sys.inspect(   data1 ));
           }
          );
          
          
         }
         else
         {
           res.writeHead(200, { 'Content-Type': 'text/html'});
           data1={'page':page,'app':app,'content':'לא התקבל ID' + sys.inspect(req.parsedurl) + sys.inspect(app.ObjectID.createFromHexString(req.parsedurl.query['_id'])) };
           page.content.call(page,data1,function(echo){res.write(echo);res.end(); });
           
         }
         //res.writeHead(200, { 'Content-Type': 'text/html'});        
         //data1={'page':page,'app':app, model_name:'model1', 'model1':page.model };
         //res.write(      page.add.call(page,data1)        );
         //res.end();
        }
        return true;
       },
      };
      
      
 
 return page; 
} ;
 
