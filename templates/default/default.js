this.page=function(app)
{
 var page=
     {
      //pagethis:this,
      //pagearguments:arguments,
      pagefilename:__filename,
      pageurl:'admin',
       // add error on existing function       
       load_templates:  // strings treated as template filenames to load and prepeare
       {
        default1:"default/default.html",
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
        callback({'page':page,'app':app });
       },
       
       main:function (shared,route_i)
       {
        var req=shared.req,res=shared.res,page=shared.page;
      
        //var currentpage=request.querystring['page']
        res.writeHead(200, { 'Content-Type': 'text/html'});        
        data1={'page':page,'app':app};
        res.write( page.default1.call(page,data1) );
        res.end();
        return true;
       },

      };
      
      
 
 return page; 
} ;
 
