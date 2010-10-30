this.main=function(app)
{
//app.milliseconds=milliseconds,
  app.init_first=function(modules)
  {
    // install modules and setup models
    console.log("starting to install modules and to setup models");
    for(var i =0; i < modules.length ; i++ )
     modules[i].setupfirst(app);

    console.log("start app.load_app_templates");
    app.load_app_templates(); 
    console.log("start modules[i].setup");
    for(var i =0; i < modules.length ; i++ ) modules[i].setup(app)   ;
     console.log("start app.models[i].setupfirst");
     for(var i in app.models) app.models[i].setupfirst(app);
     console.log("start app.models[i].setup");
     for(var i in app.models) app.models[i].setup(app);
     console.log("end install modules and setup models");
    // end install modules and setup models
  };
  
  app.init=function(db,modules,callback)
  {
    //setup cllections and continue to setup pages
    console.log("start app.init");
    app.setupDb(db, function()
    {
     console.log("start app.models[i].setuplast");
     //  last install modules and setup models
     for(var i in app.models) app.models[i].setuplast(app);
     console.log("start app.modules[i].setuplast");
     for(var i =0; i < modules.length ; i++ ) modules[i].setuplast(app) ;
     app.setuppages();
     // end last install modules and setup models
    
    callback(); 
    
    });   
    //    this.setupWebSocket();
    // probably it is posible to start services here
  };
  app.init_last=function()
  {
  // probably database based init can go here
  };
  
  app.setupDb=function(db, callback) {
    
    // simple version:
    // db.createCollection('visits', function(err, collection)
    // {
    //  db.collection('visits', function(err, collection)
    //  {
    //    model.collection = collection;  callback();   });  });
    
    app.inflow.each({'app':app},app.models,function (model,key){
     var next=this;
     //console.log('create collection: app.models.'+model.modelname+'.collection = '+model.general.name);
     model.modelname=key;
     //db.createCollection(model.general.name, function(err, collection)    {
     db.collection(model.general.name , function(err, collection) {
      //console.log('collection created!');
      model.collection = collection;
      next();
     });
     //});
     
    },callback);
    
  };
};