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
        edit:"default/edit.html",
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
            'edit': {  model:page.model                 , column_set:'edit'  , where:null            , load_items:false,  load_subitems:true    },
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
          // console.log(data);         
          var updateok=false;
          if(data)
          {
          
           if(data['model_edit'])
           {
            if(data['model_edit']._id)
            {

             var where={'_id':app.ObjectID.createFromHexString(data['model_edit']['_id'])};            
             delete data['model_edit']['_id'];
             
  
             page.model.update(where,data['model_edit'],function (where ,datawithkey)
             { 
              //updateok=true; 
              app.httputils.redirect(req,res,'/'+page.model.general.urlprefix+page.model.pages.list.pageurl);
             });
             /*
             if(!updateok)
             {
              res.writeHead(200, { 'Content-Type': 'text/html'});        
              data1={'page':page,'app':app, 'req':req, 'content': sys.inspect(data) };
              res.write(      page.content.call(page,data1)        );
              res.end();
             }*/
             return;
            }
           }
          }
          
          res.writeHead(200, { 'Content-Type': 'text/html'});
          data1={'page':page,'app':app,'content':'No ID' + sys.inspect(data) };
          res.write( page.content.call(page,data1) );
          res.end();

         });
        }
        else
        {
         if(req.parsedurl.query['_id'])
         {
         
        

          var data1={'page':page, 'app':app, 'req':req, }         
          app.load_data(
           {
            'edit': {  model:page.model                 , column_set:'edit'  , where:{'_id':app.ObjectID.createFromHexString(req.parsedurl.query['_id'])}            , load_items:true,  load_subitems:true    },
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
             page.edit.call(page, data1 ,function (echo){
              res.write(echo);
              res.end();
             });
             //sys.puts(sys.inspect(   data1 ));
           }
          );

          
          
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
        }
        return true;
       },
      };
      
      
 
 return page; 
} ;
 
