this.page=function(app)
{
 var page=
     {
       pagefilename:__filename,
       pageurl:'',
       // add error on existing function       
       load_templates:  // strings treated as template filenames to load and prepeare
       {
        default1:"website/default.html",
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
        //var currentpage=request.querystring['page']
        shared.res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8'});        
        data1={'page':shared.page,'app':shared.app};
        shared.res.write( shared.page.default1.call(shared.page,data1) );
        shared.res.end();
        return true;
       },

      };
      
      
 
 return page; 
} ;
 
