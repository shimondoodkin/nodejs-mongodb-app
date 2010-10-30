this.main =function main(app)
{

    app.fake_load_data= function(items_to_load,retdata,callback)
    {
             var call_count=1;

              for(var items_to_load_key2 in items_to_load)
              {
               if(items_to_load.hasOwnProperty(items_to_load_key2))
               {
                var info_of_model_to_load2=items_to_load[items_to_load_key2];
                call_count++;
                (function(info_of_model_to_load,items_to_load_key) {
                process.nextTick(function ()
                {
                      var loaded_subitems={},items={};
                      //
                      retdata['item_name']                     = items_to_load_key;
                      retdata[items_to_load_key]              = app._.clone(info_of_model_to_load.empty_object);
                      //
                      //console.log(sys.inspect(info_of_model_to_load))
                      retdata['error_name']                      = 'error_'       +items_to_load_key;
                      retdata['error_'      +items_to_load_key]   = null;
                      //
                      retdata['cursor_name']                     = 'cursor_'      +items_to_load_key;
                      retdata['cursor_'      +items_to_load_key]  = items;
                      //
                      if(info_of_model_to_load.load_one)
                      {
                       retdata['item_name']                      = items_to_load_key;
                       retdata[items_to_load_key]                = app._.clone(info_of_model_to_load.model.empty_object);
                      }
                      //
                      if(info_of_model_to_load.askey)
                      {
                       var askey={};
                       //for(var i=0;i<items.length;i++)
                       //{
                       // askey[items[i]._id]=items[i];
                       //}
                       retdata['askey_name']                      = "askey_"+items_to_load_key;
                       retdata["askey_"+items_to_load_key]        = askey;
                      }
                      //
                      retdata['model_name']                       = 'model_'       +items_to_load_key;
                      retdata['model_'       +items_to_load_key]  = info_of_model_to_load.model;
                      //
                      retdata['sub_cursors_name']                 = 'sub_cursors_' +items_to_load_key;
                      retdata['sub_cursors_' +items_to_load_key]  = loaded_subitems;
                      //console.log(sys.inspect(   items ));
                      call_count--;  if(call_count==0)     callback();
                      //fs.readFile(__filename, group_slot);
                }); // next tick
                })(info_of_model_to_load2,items_to_load_key2);// subfunction
               }; // if has own
              } //for in

             call_count--;  if(call_count==0)     callback();
    };
    
    app.load_data= function(items_to_load,retdata,callback)
    {
             var call_count=1;


              for(var items_to_load_key2 in items_to_load)
              {
               if(items_to_load.hasOwnProperty(items_to_load_key2))
               {
                var info_of_model_to_load2=items_to_load[items_to_load_key2];
                call_count++;
                (function(info_of_model_to_load,items_to_load_key) {
                //console.log("top model---------------************************************");
                //console.log(sys.inspect(info_of_model_to_load,0));
                process.nextTick(function ()
                {
                 
                 if(items_to_load_key=='homepage' && info_of_model_to_load.where && ('_id' in info_of_model_to_load.where) && (!info_of_model_to_load.where['_id'])) // have _id but it is null or undefined
                 {
                  //console.log("load where:--"+require('sys').inspect(info_of_model_to_load.where));
                  //info_of_model_to_load.load_subitems=false
                  //info_of_model_to_load.load_items=false;
                  //info_of_model_to_load.load_one=false;
                 }
                 
                 var loaded_subitems={},items={};
                 if(info_of_model_to_load.load_subitems && info_of_model_to_load.load_items)
                 { // multi load double
                  app.load_subitems( info_of_model_to_load.model , info_of_model_to_load.column_set , function (loaded_subitems)
                  {
                  info_of_model_to_load.model.select(info_of_model_to_load.where,function (cursor)
                  {
                  cursor.toArray(function(err, items)
                  {
                         //console.log("inner model1---------------+++++++++++++++++++++++++++++++++");
                         //console.log(sys.inspect(info_of_model_to_load,0));
                         //
                         retdata['error_name']                      = 'error_'       +items_to_load_key;
                         retdata['error_'      +items_to_load_key]  = err;
                         //
                         if(info_of_model_to_load.fill_empty)
                         {
                          for(var i=0;i<items.length;i++)
                          {
                           app._.add(items[i],info_of_model_to_load.empty_object);
                          }
                         }
                         //
                         retdata['cursor_name']                     = 'cursor_'      +items_to_load_key;
                         retdata['cursor_'      +items_to_load_key] = items;
                         //
                         if(info_of_model_to_load.load_one)
                         {
                          retdata['item_name']                      = items_to_load_key;
                          retdata[items_to_load_key]                = items.length>0?items[0]:app._.clone(info_of_model_to_load.model.empty_object);
                         }
                         //
                         if(info_of_model_to_load.askey)
                         {
                          var askey={};
                          for(var i=0;i<items.length;i++)
                          {
                           askey[items[i]._id]=items[i];
                          }
                          retdata['askey_name']                      = "askey_"+items_to_load_key;
                          retdata["askey_"+items_to_load_key]        = askey;
                         }
                         //
                         if(info_of_model_to_load.asgroups)
                         {
                          var asgroups={},asgroupname=info_of_model_to_load.asgroups;
                          for(var i=0;i<items.length;i++)
                          {
                           var key=items[i][asgroupname];
                           if(! (key in asgroups)) asgroups[key]=[];
                           asgroups[key].push(items[i]);
                          }
                          retdata['asgroups_name']                      = "asgroups_"+items_to_load_key;
                          retdata["asgroups_"+items_to_load_key]        = asgroups;
                         }
                         //
                         retdata['model_name']                      = 'model_'       +items_to_load_key;
                         retdata['model_'       +items_to_load_key] = info_of_model_to_load.model;
                         //
                         retdata['sub_cursors_name']                = 'sub_cursors_' +items_to_load_key;
                         retdata['sub_cursors_' +items_to_load_key] = loaded_subitems;
                         //
                         //console.log(sys.inspect(   items ));
                         call_count--;  if(call_count==0)     callback();
                         //
                  });//toarray
                  });//select
                  });//subitems2
                 }
                 else if(info_of_model_to_load.load_subitems)
                 { // multi load
                   app.load_subitems( info_of_model_to_load.model , info_of_model_to_load.column_set , function (loaded_subitems)
                   {
                         //console.log("inner model2---------------+++++++++++++++++++++++++++++++++");
                         //console.log(sys.inspect(info_of_model_to_load,0));
                         //console.log(sys.inspect(info_of_model_to_load))
                         retdata['error_name']                      = 'error_'       +items_to_load_key;
                         retdata['error_'      +items_to_load_key]  = null;
                         //
                         if(info_of_model_to_load.fill_empty)
                         {
                          for(var i=0;i<items.length;i++)
                          {
                           app._.add(items[i],info_of_model_to_load.empty_object);
                          }
                         }
                         //
                         retdata['cursor_name']                     = 'cursor_'      +items_to_load_key;
                         retdata['cursor_'      +items_to_load_key] = items;
                         //
                         if(info_of_model_to_load.load_one)
                         {
                          retdata['item_name']                      = items_to_load_key;
                          retdata[items_to_load_key]                = items.length>0?items[0]:app._.clone(info_of_model_to_load.model.empty_object);
                         }
                         //
                         if(info_of_model_to_load.askey)
                         {
                          var askey={};
                          //  for(var i=0;i<items.length;i++)
                          //  {
                          //   askey[items[i]._id]=items[i];
                          // }
                          retdata['askey_name']                      = "askey_"+items_to_load_key;
                          retdata["askey_"+items_to_load_key]        = askey;
                         }
                         //
                         if(info_of_model_to_load.asgroups)
                         {
                          var asgroups={},asgroupname=info_of_model_to_load.asgroups;
                          //for(var i=0;i<items.length;i++)
                         // {
                         //  if(! (items[i][asgroupname] in asgroups)) asgroups[items[i][asgroupname]]=[];
                         //  asgroups[items[i][asgroupname]].push(items[i]);
                         // }
                          retdata['asgroups_name']                      = "asgroups_"+items_to_load_key;
                          retdata["asgroups_"+items_to_load_key]        = asgroups;
                         }
                         //

                         //
                         retdata['model_name']                      = 'model_'       +items_to_load_key;
                         retdata['model_'       +items_to_load_key] = info_of_model_to_load.model;
                         //
                         retdata['sub_cursors_name']                = 'sub_cursors_' +items_to_load_key;
                         retdata['sub_cursors_' +items_to_load_key] = loaded_subitems;
                         //console.log(sys.inspect(   loaded_subitems ));
                         call_count--;  if(call_count==0)     callback();
                         //
                   });//subitems2
                 }
                 else if(info_of_model_to_load.load_items || info_of_model_to_load.load_one)// load select
                 {
                   // single load 
                   info_of_model_to_load.model.select(info_of_model_to_load.where,function (cursor)
                   {
                   cursor.toArray(function(err, items)
                   {
                         //console.log("inner model3---------------+++++++++++++++++++++++++++++++++");
                         //console.log(sys.inspect(info_of_model_to_load,0));
                         //console.log(sys.inspect(info_of_model_to_load))
                         retdata['error_name']                      = 'error_'       +items_to_load_key;
                         retdata['error_'      +items_to_load_key]  = err;
                         
                         if(info_of_model_to_load.fill_empty)
                         {
                          for(var i=0;i<items.length;i++)
                          {
                           app._.add(items[i],info_of_model_to_load.empty_object);
                          }
                         }
                         
                         retdata['cursor_name']                     = 'cursor_'      +items_to_load_key;
                         retdata['cursor_'      +items_to_load_key] = items;
                                              
                         if(info_of_model_to_load.load_one)
                         {
                          retdata['item_name']                       = items_to_load_key;
                          retdata[items_to_load_key]                 = items.length>0?items[0]:app._.clone(info_of_model_to_load.model.empty_object);
                         }
                         
                         //
                         if(info_of_model_to_load.askey)
                         {
                          var askey={};
                          for(var i=0;i<items.length;i++)
                          {
                           askey[items[i]._id]=items[i];
                          }
                          retdata['askey_name']                      = "askey_"+items_to_load_key;
                          retdata["askey_"+items_to_load_key]        = askey;
                         }
                         //
                         if(info_of_model_to_load.asgroups)
                         {
                          var asgroups={},asgroupname=info_of_model_to_load.asgroups;
                          for(var i=0;i<items.length;i++)
                          {
                           var key=items[i][asgroupname];
                           if(! (key in asgroups)) asgroups[key]=[];
                           asgroups[key].push(items[i]);
                          }
                          retdata['asgroups_name']                      = "asgroups_"+items_to_load_key;
                          retdata["asgroups_"+items_to_load_key]        = asgroups;
                         }
                         //
                         
                         retdata['model_name']                      = 'model_'       +items_to_load_key;
                         retdata['model_'       +items_to_load_key] = info_of_model_to_load.model;
                         
                         retdata['sub_cursors_name']                = 'sub_cursors_' +items_to_load_key;
                         retdata['sub_cursors_' +items_to_load_key] = {};//loaded_subitems;
                         //console.log("inner retdata3---------------+++++++++++++++++++++++++++++++++");
                         //console.log(sys.inspect(retdata,0));
                         //console.log(sys.inspect(   items ));
                         call_count--;  if(call_count==0)     callback();
                         //
                   });//toarray
                   });//select
                 }
                 else // return empty row /  rows
                 {
                         //console.log("inner model3---------------+++++++++++++++++++++++++++++++++");
                         //console.log(sys.inspect(info_of_model_to_load,0));
                         //console.log(sys.inspect(info_of_model_to_load))
                         retdata['error_name']                      = 'error_'       +items_to_load_key;
                         retdata['error_'      +items_to_load_key]  = null;
                         
                         retdata['cursor_name']                     = 'cursor_'      +items_to_load_key;
                         retdata['cursor_'      +items_to_load_key] = [];
                                              
                         if(info_of_model_to_load.load_one)
                         {
                          retdata['item_name']                       = items_to_load_key;
                          retdata[items_to_load_key]                 = app._.clone(info_of_model_to_load.model.empty_object);
                         }
                         
                         //
                         if(info_of_model_to_load.askey)
                         {
                          var askey={};
                          retdata['askey_name']                      = "askey_"+items_to_load_key;
                          retdata["askey_"+items_to_load_key]        = askey;
                         }
                         //
                         if(info_of_model_to_load.asgroups)
                         {
                          var asgroups={};
                          retdata['asgroups_name']                      = "asgroups_"+items_to_load_key;
                          retdata["asgroups_"+items_to_load_key]        = asgroups;
                         }
                         //
                         
                         retdata['model_name']                      = 'model_'       +items_to_load_key;
                         retdata['model_'       +items_to_load_key] = info_of_model_to_load.model;
                         
                         retdata['sub_cursors_name']                = 'sub_cursors_' +items_to_load_key;
                         retdata['sub_cursors_' +items_to_load_key] = {};
                         //console.log("inner retdata3---------------+++++++++++++++++++++++++++++++++");
                         //console.log(sys.inspect(retdata,0));
                         //console.log(sys.inspect(   items ));
                         call_count--;  if(call_count==0)     callback();
                         //
                 }
                 //fs.readFile(__filename, group_slot);

                }); // next tick
                })(info_of_model_to_load2,items_to_load_key2);// subfunction
               }; // if has own
              } //for in
          call_count--;  if(call_count==0)     callback();
       
    };
    
}