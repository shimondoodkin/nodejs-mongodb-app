this.main=function(app)
{
     app.basicmodel.pages=
     {
      list:require('templates/default/list').page.call(this,app,this), 
      add:require('templates/default/add').page.call(this,app,this), 
      edit:require('templates/default/edit').page.call(this,app,this), 
      del:require('templates/default/del').page.call(this,app,this), 
     };
     
     app.basicmodel.addpages= function(callback)
     {
      var p,tempalte_name,template_function;
      for(p in this.pages)
      {
       var page=this.pages[p];
       //add .model reference to page
       page.model=this;
       //if(this.modelname=='t1_organization')  console.log(" addpages page "+p);      
       app.doubletemplate.load_templates(page);
      }
      if(callback)callback(callback);
     };
     
     app.basicmodel.addurls= function(callback)
     {
      var p;
      // adlater calling route before, route after
      for(p in this.pages)
      {
       var pageurl='/'+this.general.urlprefix+this.pages[p].pageurl;
       
       //app.url_routes.push({path:pageurl,code:function(req,res,page,callback){res.writeHead(200, { 'Content-Type': 'text/plain'});res.write('hello world');res.end();}});
       app.url_routes.push({path:pageurl,page:this.pages[p]});
      }
      if(callback)callback(callback);
     };
     
     app.basicmodel.setupfirst= function( data )
     {
       
     };
     
     app.basicmodel.setup= function( data )
     {
       
     };
     
     app.basicmodel.setuplast= function( data )
     {
      app.prepare_subitems_lists(this);
      var self = this;
      app._.foreach(this.fields , function(field , field_key){
    	  self.empty_object[field_key] = '';
      });
      this.addpages();
      this.addurls();
     };
}