this.main=function main(app)
{
    app.prepare_subitems_lists = function prepare_subitems_lists(main_model)
    {
     //sys.puts(sys.inspect(main_model));
     var operation,operations=['edit','view'];
     var operations_copy={'list':'view','add':'edit','multiupdate':'edit','advancedsearch':'edit'};
     var arrselections,fieldname,havelookup,lookupinfo,field,operations_type;
     
     main_model.prep_subitems={};
     
     for(var i=0;i<operations.length;i++)
     {
      operation=operations[i];
      arrselections=[];
      operations_type=operation;
           if(operation=='view')           operations_type='view';
      else if(operation=='list')           operations_type='view';
      else if(operation=='add')            operations_type='edit';
      else if(operation=='multiupdate')    operations_type='edit';
      else if(operation=='advancedsearch') operations_type='edit'; // add searchtags later
      for(fieldname in main_model.fields)
      {
       if(!main_model.fields[fieldname]) console.log('field \''+main_model.general.name +','+fieldname+'\' not found')
       field=main_model.fields[fieldname];

       if(operations_type=='view')
       {
        if(typeof field.viewtag[
         field[operations_type].ftype
        ].lookup===null)
        {
         havelookup=field.edittag[
          field['edit'].ftype
         ].lookup
         ?true:false;
         if(havelookup)
          lookupinfo=field.edittag.lookup;
        }
        else
        {
         havelookup=field.edittag[
          field[operations_type].ftype
         ].lookup
         ?true:false;
         if(havelookup)
         {
          if(field.viewtag.lookup.sameasedit)
           lookupinfo=field.edittag.lookup;
          else
          {
           lookupinfo=field.viewtag.lookup;
          } 
         }
        }
       }
       else
       {
        //console.log(operations_type);
        //console.log(sys.inspect(field));
         havelookup=field.edittag[ field[operations_type].ftype  ].lookup?true:false;
         if(havelookup)
         {
          lookupinfo=field.edittag.lookup;
         }
       }
        
       if(havelookup)
       {
        arrselections.push({where:(lookupinfo.where?lookupinfo.where:false), submodel:app.models[lookupinfo.tablename],'fieldname':fieldname,cursor:[],'lookupinfo':lookupinfo});
       }
      }
      
      main_model.prep_subitems[operation]=arrselections;
     }
       
     
     var source,target;
     for(target in operations_copy)
     {
      source=operations_copy[target];
      main_model.prep_subitems[target]=main_model.prep_subitems[source];
     }
     //console.log(sys.inspect(main_model.prep_subitems));
    }
    

    
    app.load_subitems = function load_subitems(main_model,operation,callback)
    {        //shoud i add static support ? app.load_subitems( page.model , 'static/cached/on change of a specific model(onchange is multi process unsupported)') ? <<should i add this later? 
     if(main_model.prep_subitems[operation].length==0)callback({});
     //console.log(main_model.modelname+','+operation);
     //console.log(main_model.modelname+"|"+operation+"| "+sys.inspect(main_model.prep_subitems[operation]));     
     var arrselections=app._.cloneuptolevel(main_model.prep_subitems[operation],2)
     
     app.step(
      function ()
      {
       //console.log('start get items for a all sub items collection');
       var new_group = this.group();
       //console.log(sys.inspect(arrselections,false,1));
       arrselections.forEach(function (selection,i,arr)
       //for(var i=0,l=arrselections.length;i<l;i++)
       {
        //console.log('start get items for a subitem collection '+selection.fieldname);
        var ret_group=new_group(); // add + 1 count to wait for results list
        //console.log('select sub items: selections.'+selection.fieldname+'.fieldname = '+selection.fieldname);
        if(!selection.where)selection.where=null;
     
        selection.submodel.select(selection.where,function (cursor)
        {
         try{
//          console.log('ret list' + sys.inspect(cursor));
         cursor.toArray(function(err, items)
         {
          ///console.log('recevied array');
          //console.log('received subitems '+selection.fieldname);
          //console.log(sys.inspect(items));
          selection.cursor=items;
          ret_group(null,true); 
         });
         }
         catch(e)
         {
          //console.log('error in load_subitems');
          //(new_group())(null,true);
          ret_group(null,false);
         }
         
        });
        
       });
       //console.log('step 100');
       //this.next();
      },
      function (err, contents)
      {
       //     console.log('end');
       //if(err)
       // console.log('step 200 ='+err);
       //else 
       // console.log('step 200 ='+contents);
       err=null;
       //console.log(sys.inspect(arrselections))
       var byfield={};
       for(var i=0,l=arrselections.length;i<l;i++)
        byfield[arrselections[i].fieldname]=arrselections[i];
       //if (err) { throw err; }
       arrselections=null;
       callback(byfield);
       
      }
     );
    }
     
}