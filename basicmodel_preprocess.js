this.main=function(app)
{
    app.path_exists={};    
    app.mkdir_cached=function mkdir_cached(wantedpath,callback)
    {
     if(app.path_exists[wantedpath])callback();
     app.path.exists(wantedpath,
     function (wantedpath_exists)
     {
      if(!wantedpath_exists)
      {
       app.fs.mkdir(wantedpath, 0777, function (err)
       {
        if(err) throw err; 
        callback();
       });
      }
      else
      {
       app.path_exists[wantedpath]=true;
       callback();
      }
     });
    };
    
    app.basicmodel.mkdir=function mkdir(wantedpath,callback)
    {
     app.path.exists(wantedpath,
     function (wantedpath_exists)
     {
      if(!wantedpath_exists)
      {
       app.fs.mkdir(wantedpath, 0777, function (err)
       {
        if(err) throw err; 
        callback();
       });
      }
      else
      {
       callback();
      }
     });
    };
    
  app.basicmodel.preprocess_document=function preprocess_document(data , add, callback)
     {
      var callback_count=0;
      callback_count++;
      var model = this;
      //console.log(sys.inspect(data));
      //console.log('p1');
      if('_id' in data)
      {
       if(typeof data['_id']==='string')
       {
        if(data['_id']=='')
        {
         if(add) delete data['_id'];   
        }
        else 
        {
         data['_id']=app.ObjectID.createFromHexString(data['_id']);
        }
       }
       else if(typeof data['_id']==='object' && (!(data['_id'] instanceof app.ObjectID)) )
       {
        if(!data['_id'].id)
        {
          delete data['_id'];   
        }
        else if(data['_id'].id!='')       
        {
         data['_id']=new app.ObjectID(data['_id'].id);
        }
       }
      }
      for(var x in model.fields)
      {
       if( model.fields.hasOwnProperty( x))
       {
        var field = model.fields[x];
        //console.log(sys.inspect(field.edit));
        //console.log(sys.inspect(field.general.title));
        //console.log(sys.inspect(data.x));
        //every time especialy on update

        if(field.edit.ftype==='select' && 
           field.edittag.lookup.usetable && 
           field.edittag.lookup.linkedfield=='_id' )
        {
         if (x in data)
         {
          if(typeof data[x]==='string')
          {
           if(data[x]=='')
           {
            delete data[x];   
           }
           else        
           {
            data[x]=app.ObjectID.createFromHexString(data[x]); 
           }
          }
          else if(typeof data[x]==='object' && (!(data[x] instanceof app.ObjectID)) )
          {
           if(data[x].id=='')
           {
            delete data[x];   
           }
           else        
           {
            data[x]=new app.ObjectID(data[x]); 
           }
          }
         }
        }

        
        if(field.edit.ftype==='file')
        {
         if (x in data ) //&& typeof data[x]==='object'
         {
          if(typeof data[x] =='object' )
          {
          var action;
          action = data[x].upload?'replace':'keep';
          if('action' in data[x]) { action=data[x]['action'];console.log('f4'); } // keep strategy
          if(action == 'keep')
          {
           if('value' in data[x]) // keep strategy
           {
            //console.log("the value="+data[x]['value']);
            data[x]=JSON.parse(data[x]['value']);
           }
          }
          else if(action == 'delete')
          {
           if((x in data) && ('value' in data[x]))// delete file
           {
            var value=false;
            try{value==JSON.parse(data[x]['value']);} catch (e) {console.log(e.stack);}
            if(value!==false)
            data[x]=value;
            if('path' in data[x] && data[x].path!='')
            {
             var filetodelete=app.files_path+data[x].path;
             delete data[x];
             callback_count++;
             app.path.exists(filetodelete,function(exists)
             {
              app.fs.unlink(filetodelete, function (){console.log('f11');
                callback_count--;
                if(callback_count==0)
                 callback(data);
              });
             });
            }
           }// end delete file
          }
          else if(action == 'replace')
          {
           callback_count++;
          console.log('f12');
           if((x in data) && ('value' in data[x]))// delete file
           {
            var value=false;
            try{value=JSON.parse(data[x]['value']);} catch (e) {console.log(e.stack);}            
            if( value!==false && ('path' in value) && value.path!='')
            {
             var filetodelete=app.files_path+value.path;
             //delete data[x];
             callback_count++;
             app.path.exists(filetodelete,function(exists)
             {
              //console.log("file raplace - delete : \r\n"+filetodelete+"\r\n"+sys.inspect(value));
              app.fs.unlink(filetodelete, function (){
                callback_count--;console.log('f17');
                if(callback_count==0)
                 callback(data);
              });
             });
            }

           }// end delete file

           //console.log("file raplace: \r\n"+sys.inspect(data)); // instead of value i need to load all data from database.
           var filepath = data[x]['upload']['path'];
           //console.log(sys.inspect(data[x]));
           filepath_basename=filepath.substring(filepath.lastIndexOf('/')+1,filepath.length);
           
           var newpath1=app.files_path+model.modelname;
           var newpath2=app.files_path+model.modelname+'/'+x;
           
           var newpath =app.files_path+model.modelname+'/'+x+'/'+filepath_basename;
           var dbpath =model.modelname+'/'+x+'/'+filepath_basename;
           //create folders
           //move file
           //update data
           data[x]=
           {
            mime:data[x]['upload']['mime'],
            filename:data[x]['upload']['filename'],
            path:dbpath
            /*,meta:data[x]['file']['meta']*/
           };
           
           app.mkdir_cached(newpath1, function ()
           {
            app.mkdir_cached(newpath2, function ()
            {
             app.fs.rename(filepath, newpath, function (err)
             {
              if(err)throw err;
              callback_count--;
              if(callback_count==0)
               callback(data);
             });
            });
           });
          }//if replace
          }
          else
          {
           delete data[x];
          }
         }//if x in data
        }//end of: if ( field.edit.ftype==='file' ) //

        if(field.general.ftype==='date')
        {
         if (x in data && typeof data[x]==='string' && data[x]!='')
         {            data[x]=app.phpjs.strtotime();
          var parseddate=app.date.parseDate(data[x]);
          if(pdate==null)
          {
           delete data[x]; // should i do anythng with null values? (maybe a filed should have a function called  "error default value" with default of null )
          }
          else
          {
           data[x]=pdate;
          } 
         }
         //else
         //{  
         // delete data[x];   
         //}
        }
        
        if(field.general.ftype==='number')
        {
         if (x in data && typeof data[x]==='string' && data[x]!='')
         {
          data[x]=parseFloat(data[x]); 
         }
        }
          
        // on add
        if(add)
        {
         if ('default_value' in field.add)
         {
          data[x]=field.add.default_value;
         }
        }
       }//if
      }//for
      callback_count--;
      if(callback_count==0)
       callback(data);
     }
}