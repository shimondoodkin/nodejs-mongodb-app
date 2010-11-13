this.main=function(app)
{
     app.dbutil={};
     app.dbutil.indexOfid=function( arr, id) // used to create assosiative arrays
     {
      if(!id.id)
       return -1;
      var id =id.id,el,i=arr.length;
      i--;
      for(;i>-1;i--)
      {
       el=arr[i];
       if(el.id&&el.id==id)
       {
        return i;
       }
      }
      return -1;
     };
     
     //maybe better to use jslinq
     /*
     app.dbutil.sub_findoneid=function(arr, colname, id) // used to create assosiative arrays
     {
      if(!id.id)
       return -1;
      var id =id.id,el,i=arr.length;
      i--;
      for(;i>-1;i--)
      {
       el=arr[i];
       if(!el.colname) continue;
       if(el.colname.id&&el.colname.id==id)
       {
        return i;
       }
      }
      return -1;
     };
     */
}

/*


//v1:
//bad
db.select({cols:['foo','moo'],from:'bar',where:['(','a','=','15','and','b','=','15',')','or','z','=','10']}})

//v2:
db.select({cols:['foo','moo'],from:'bar',where:{$or:{$and:{a:1,b:2},c:3}})
//v3:
db.select({cols:['foo','moo'],from:'bar',where:{a:1}})
//v4:
mycollection.select({where:{a:1}});

//v5:
db.select({cols:['foo','moo'],from:'bar',where:function{ return (a==1 && b==2) || c==3; } );
//v6:
db.select({cols:{'bar':['foo','moo']},from:'bar',where:function{ return (a==1 && b==2) || c==3; } );
//v7:
db.select({cols:{'bar':[{'4foo':function(){return bar.foo*5}},'moo']},from:'bar',where:function{ return (a==1 && b==2) || c==3; } );

//v8:
//probabbly wont work: collection.select({cols:['foo','moo'],from:['bar','baz'],where:function{ return (bar.a==1 && b==2) || baz.c==3; }, groupby:['foo'], orderby:[{moo:'asc'},{foo:'desc'}] );

//v9:
db.select({cols:['foo','moo'],from:['bar','baz'],where:'(bar.a==1 && b==2) || baz.c==3', groupby:['foo'], orderby:[{moo:'asc'},{foo:'desc'}] );
//v10:
db.select({cols:['foo','moo'],from:['bar','baz'],where:['(bar.a==? && b==?) || baz.c==?',1,2,3], groupby:['foo'], orderby:[{moo:'asc'},{foo:'desc'}] );
//v11:
db.select({cols:['foo','moo'],from:['bar','baz'],where:['(bar.a==',1,' && b==',2,') || baz.c==',3], groupby:['foo'], orderby:[{moo:'asc'},{foo:'desc'}] );
//v12:
db.select({cols:['foo','moo'],from:['bar','baz'],where:['min(a,b)==',2,' || baz.c==',3], groupby:['foo'], orderby:[{moo:'asc'},{foo:'desc'}] );
//v13:
db.select({cols:['foo','moo'],from:{'bar',db.mycollection,'baz':db.mycollection2},where:['min(a,b)==',2,' || baz.c==',3], groupby:['foo'], orderby:[{moo:'asc'},{foo:'desc'}] );

simple result is array
group by result is object , subobject, array ... as required
or
group by is array is in mysql 



*/