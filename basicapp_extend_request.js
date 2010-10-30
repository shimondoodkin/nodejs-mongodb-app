this.main=function(app)
{
     
var cookie = {
	req:null,
	get:function() { 
	 var req = this.req;
	 return (req.headers.cookie ? this.parse(req.headers.cookie) : {});
	},
	parse:function(str)	{
	    var obj = {},
	        pairs = str.split(/[;,] */);
	    for (var i = 0, len = pairs.length; i < len; ++i) {
	        var pair = pairs[i],
	            eqlIndex = pair.indexOf('='),
	            key = pair.substr(0, eqlIndex).trim().toLowerCase(),
	            val = pair.substr(++eqlIndex, pair.length).trim();
	        // Quoted values
	        if (val[0] === '"') {
	            val = val.slice(1, -1);
	        }
	        // Only assign once
	        if (obj[key] === undefined) {
	            //obj[key] = querystring.unescape(val, true);
	        	obj[key] = val;
	        }
	    }
	    return obj;
	}
};


function getuser(callback){
	var req = this;
	data = req.cookie.get();
	if (data.user_id){
		data.user_id = app.ObjectID.createFromHexString(data.user_id);
		app.models.t2_users.getall({_id:data.user_id} , function(result){ 
			if (result.length>0){
				req.user = result[0];
				callback(req.user);
			} else {
				callback(false);
			}
			
		});
	} else {
		callback(false);
	}
}

function redirect(res, url, callback, code ) {
 res.writeHead( code || 302, {'Location': url } );
 res.end();
 if(callback)callback();
};

function query_to_string(query){
	var query_string = '';
	var prefix = '?';
	for (var name in query){
		query_string+= prefix + name + '=' + query[name];
		prefix = '&';
	}
	return query_string;
}

  
  app.extendrequest=function (req)
  {
   req.cookie = cookie;
   req.cookie.req = req;
   req.user = null;
   req.getuser = getuser;
   req.redirect = redirect;
   req.query_to_string = query_to_string;
   /*
   
   req.sessions={}
   req.sessions.req=req;
   req.sessions.save=session.save;
   */
  };
}