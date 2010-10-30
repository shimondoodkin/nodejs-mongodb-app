this.main=function(app)
{

     app.basicmodel.save=function( data , callback)
     {
      var that=this;
    	this.preprocess_document(data , data._id!=null,function (data2){
     	  that.collection.save(data2 ,function(err , data3){
    		 callback(data3);
    	  });       
      });
     }; 

     app.basicmodel.insert=function( data ,callback )
     {
      var that=this;
      this.preprocess_document(data , true,function (data2)
      {
       that.collection.insert(data2,function (err,doc)
       {
        //console.log("removed:"+sys.inspect(doc));
        if(err) throw err;
        //sys.puts('sucsess');
        //sys.puts(JSON.stringify(doc) );
        if(callback) callback(doc);
       });
      });
     };
     
     app.basicmodel.remove=function( where, callback )
     {
      // delete files here
      this.collection.remove( where, function (err,data)
      {
       //console.log("removed:"+sys.inspect(data));
       if(err) throw err;
       //var callback_count=0;
       // callback_count++;
 
       var model = this;
       //console.log("doc in delete:"+sys.inspect(data));
       for(var x in model.fields)
       {
        if( model.fields.hasOwnProperty( x))
        {
         var field = model.fields[x];
         //console.log(sys.inspect(field.edit));
         //console.log(sys.inspect(field.general.title));
         //console.log(sys.inspect(data.x));
         if(field.edit.ftype==='file') // delete files
         {
          if (x in data )
          {
           if('path' in data[x] && data[x].path!='')
           {
            var filetodelete=app.files_path+data[x].path;
              //delete data[x];
            //callback_count++;
            app.path.exists(filetodelete,function(exists)
            {
             app.fs.unlink(filetodelete, function (){
              // callback_count--;
              // if(callback_count==0)
              //  callback(data);
             });
            });
           }
          }//if x in data
         }//end of: if ( field.edit.ftype==='file' ) //
        }//if has own
       }//for fileds
       
       //callback_count--;
       //if(callback_count==0)
       // callback(data);
       
       //sys.puts('sucsess');
       //sys.puts(JSON.stringify(doc) );
      });
      if(callback) callback();
     };
     
     app.basicmodel.update=function( where, data ,callback ) // has bug $set is not added nestedly, only for the first level
     {
      var that=this;
      //console.log("update 1:")
      //console.log(sys.inspect(data))
      
      this.preprocess_document(data , false,function (data2)
      {
      //console.log("update 2:")
      //console.log(sys.inspect(data2))
      /*
       console.log('update');//t1_state
       if(data2.t102_header)console.log( data2.t102_header instanceof app.ObjectID);
       console.log(sys.inspect(data2));
       if(data2.t102_header)console.log(typeof data2.t102_header);
       if(data2.t102_header)console.log(typeof data2.t102_header.id);

       if(data2.t102_header)console.log( data2.t102_header.constructor);
       if(data2.t102_header)console.log( data2.t102_header.constructor.toString());*/
       //sys.puts(sys.inspect([where,data]));
       that.collection.update(where,{'$set':data2},function (err,data3)
       {
        if(err) throw err;
        //console.log("update 3:")
        //console.log(sys.inspect(data3))
        //sys.puts('sucsess');
        //sys.puts(JSON.stringify(data3) );
        if(callback) callback(data3);
       });
      });
     };
     
     app.basicmodel.updatedoc=function updatedoc( where, data ,callback )
     {
      var that=this;
      this.preprocess_document(data , false,function (data2)
      {
       //sys.puts(sys.inspect([where,data]));
       that.collection.update(where,data2,function (err,doc)
       {
        if(err) throw err;
        //sys.puts('sucsess');
        //sys.puts(JSON.stringify(doc) );
        if(callback) callback(doc);
       });
      });
     };
     

 /*  multiupdate: function( where ) { },
     report:      function( where ) { },
     search:      function( where ) { },
     onview:      function( where ) { },   */
     app.basicmodel.select=function select(where , callback ) // skip(4).limit(8);
     {
    //http://www.slideshare.net/kbanker/mongodb-schema-design-mongony
     
	  // http://www.mongodb.org/display/DOCS/Querying
	  // http://www.mongodb.org/display/DOCS/Queries+and+Cursors
	  // http://www.mongodb.org/display/DOCS/Advanced+Queries
	  // http://www.mongodb.org/display/DOCS/Optimization
		 
	  // to joins replace this method with something like db.runCommand((function () { mongodbcode }).toSource )
	  // http://github.com/mongodb/mongo/blob/master/jstests/mr1.js
	  // http://github.com/mongodb/mongo/blob/master/jstests/mr2.js 
	  // http://www.mongodb.org/display/DOCS/MapReduce
	  // http://www.mongodb.org/display/DOCS/Aggregation
	  // http://rickosborne.org/blog/index.php/2010/02/09/infographic-migrating-from-sql-to-mapreduce-with-mongodb/
	  // http://rickosborne.org/download/SQL-to-MongoDB.pdf
	  // http://rickosborne.org/blog/index.php/2010/02/08/playing-around-with-mongodb-and-mapreduce-functions/
		 
		  if(!where)
      {
       this.collection.find(
       function(err, cursor)
       {
        if(err) throw err;
        else 
        {
         if(callback) callback(cursor);
        }
       });
      }
      else
      {
       this.collection.find(where,
       function(err, cursor)
       {
        if(err) throw err;
        else 
        {
         if(callback) callback(cursor);
        }
       });
      }
      // iterating thru cursor:
      //  cursor.each(function(err, item) {
      //    if(item != null) sys.puts(sys.inspect(item));
      //  });

     };
     
     app.basicmodel.selectone=function select(where , callback ) // skip(4).limit(8);
     {
    //http://www.slideshare.net/kbanker/mongodb-schema-design-mongony
     
	  // http://www.mongodb.org/display/DOCS/Querying
	  // http://www.mongodb.org/display/DOCS/Queries+and+Cursors
	  // http://www.mongodb.org/display/DOCS/Advanced+Queries
	  // http://www.mongodb.org/display/DOCS/Optimization
		 
	  // to joins replace this method with something like db.runCommand((function () { mongodbcode }).toSource )
	  // http://github.com/mongodb/mongo/blob/master/jstests/mr1.js
	  // http://github.com/mongodb/mongo/blob/master/jstests/mr2.js 
	  // http://www.mongodb.org/display/DOCS/MapReduce
	  // http://www.mongodb.org/display/DOCS/Aggregation
	  // http://rickosborne.org/blog/index.php/2010/02/09/infographic-migrating-from-sql-to-mapreduce-with-mongodb/
	  // http://rickosborne.org/download/SQL-to-MongoDB.pdf
	  // http://rickosborne.org/blog/index.php/2010/02/08/playing-around-with-mongodb-and-mapreduce-functions/
		 
		  if(!where)
      {
       this.collection.findOne(
       function(err,doc)
       {
        if(err) throw err;
        callback(doc);
       });
      }
      else
      {
       this.collection.findOne(where,
       function(err,doc)
       {
        if(err) throw err;
        callback(doc);
       });
      }
      // iterating thru cursor:
      //  cursor.each(function(err, item) {
      //    if(item != null) sys.puts(sys.inspect(item));
      //  });

     };
     
     app.basicmodel.getall=function getall(where , callback)
     {
      this.select(where,function (cursor)
      {
       cursor.toArray(function(err, items)
       {
        callback(items);
       });
      });
     };
     
	   app.basicmodel.getone=function(where , callback){
		  //var model = this;
	 	  var base_result = app._.clone(this.empty_object);
	 	  this.selectone(where, function(doc)
      {
	     if (doc!==undefined && doc!==null )
       {
	      app._.add( doc ,base_result);
	      delete base_result;
	      callback( doc,true); // found=true
	     }
       else
       {
	      callback(base_result,false); // found=false
	     }
		  });	 
	   }
     
     app.basicmodel.getallaskey=function getallaskey(where , callback)
     {
      this.select(where,function (cursor)
      {
       cursor.toArray(function(err, items)
       {
        var askey={};
        for(var i=0;i<items.length;i++)
        {
         askey[items[i]._id]=items[i];
        }
        callback(askey);
       });
      });
     };
     
}