var sys=require('sys');

this.page=function(app,model)
{
 var page=
     {
       //pagethis:this,
       //pagearguments:arguments,
       pagefilename:__filename,
       pageurl:'/add.jsp',
       // add error on existing function       
       load_templates:  // strings treated as template filenames to load and prepeare
       {
        add:"default/add.html",
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
          //sys.puts("add page-------------///////////////////////////");
          //sys.puts(sys.inspect(page ,0));
            
          var data1={'page':page, 'app':app, 'req':{}, }         
          app.fake_load_data(
           {
            'add': {  model:page.model                 , column_set:'view'  , where:null            , load_items:false,  load_subitems:true    },
           }
          ,
           data1
          ,
          function ()
          {
            //sys.puts("add data1-------------///////////////////////////");
            //sys.puts(sys.inspect(data1.model_add,0));
            callback(data1);
          });
       },
       
       main:function (shared,route_i)
       {
        var req=shared.req,res=shared.res,page=shared.page;
      
        //var currentpage=request.querystring['page']
        if(req.method==='POST')
         app.httputils.post(req,res,function (data)
         {
          page.model.insert(data['model_add'],function (datawithkey)
          {
           app.httputils.redirect(req,res,'/'+page.model.general.urlprefix+page.model.pages.list.pageurl);
           //res.writeHead(200, { 'Content-Type': 'text/html'});        
           //data1={'page':page,'app':app, model_name:'model1', 'model1':page.model, 'content': '/'+page.model.general.urlprefix+page.pageurl };
           //res.write(      page.content.call(page,data1)        );
           //res.end();
          });
         });
        else
        {
          var data1={'page':page, 'app':app, 'req':req, }         
          app.load_data(
           {
            'add': {  model:page.model                 , column_set:'edit'  , where:null            , load_items:false,  load_subitems:true    },
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
             page.add.call(page, data1 ,function (echo){
              res.write(echo);
              res.end();
             });
             //sys.puts(sys.inspect(   data1 ));
           }
          );
        }
        return true;
       },
      };
      
      
 
 return page; 
} ;
 
