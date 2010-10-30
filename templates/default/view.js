var sys=require('sys');

this.page=function(app,model)
{
 var page=
     {
       //pagethis:this,
       //pagearguments:arguments,
       pagefilename:__filename,
       pageurl:'/edit.jsp',
       // add error on existing function       
       load_templates:  // strings treated as template filenames to load and prepeare
       {
        view:"default/view.html",
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
        var loaded_subitems={};
        //app.load_subitems( page.model , 'add' , function (loaded_subitems) {  
        callback({'page':page,'app':app, 'req':{}, model_name:'model1', 'model1':page.model,cursor_name:'cursor1', sub_cursors_name:'sub_cursors1', sub_cursors1: loaded_subitems  });
        //});
       },
       
       main:function (shared,route_i)
       {
        var req=shared.req,res=shared.res,page=shared.page;
      
        //var currentpage=request.querystring['page']
        if(req.parsedurl.query['_id'])
        {
         app.load_subitems( page.model , 'edit' , function (loaded_subitems)  {
          page.model.list({'_id':app.ObjectID.createFromHexString(req.parsedurl.query['_id'])},function (cursor)
          {
           cursor.toArray(function(err, items)
           {
            res.writeHead(200, { 'Content-Type': 'text/html'});        
            data1={'page':page,'app':app, 'req':req, cursor_name:'cursor1','cursor1': items, model_name:'model1', 'model1':page.model, sub_cursors_name:'sub_cursors1', sub_cursors1: loaded_subitems  };
            res.write( page.edit.call(page,data1) );
            res.end();
            // sys.puts();
            //sys.puts(sys.inspect(   items ));
           });
          });
         });
        }
        else
        {
          res.writeHead(200, { 'Content-Type': 'text/html'});
          data1={'page':page,'app':app,'content':'No ID' + sys.inspect(req.parsedurl) + sys.inspect(app.ObjectID.createFromHexString(req.parsedurl.query['_id'])) };
          res.write( page.content.call(page,data1) );
          res.end();
        }
        //res.writeHead(200, { 'Content-Type': 'text/html'});        
        //data1={'page':page,'app':app, model_name:'model1', 'model1':page.model };
        //res.write(      page.add.call(page,data1)        );
        //res.end();

        return true;
       },
      };
      
      
 
 return page; 
} ;
 
