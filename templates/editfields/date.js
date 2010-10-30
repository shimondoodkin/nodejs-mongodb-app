this.receive=function(app)
{
  var receive={receive:function (name,req,res,data)
  {
   return data[name];
  },
 };
 return receive; 
} ;
 
