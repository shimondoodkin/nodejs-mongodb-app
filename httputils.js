//thanks to creationix - large protion of the code here is learned from his connect library.

var querystring = require('querystring');
var sys = require('sys');
var formidable  = require("deps/node-formidable");
var fs = require('fs');
var _ = require('deps/nodejs-clone-extend/merger');
this.temp=__dirname+'/temp/';


var lastrandom=[]
var lastrandom_time=0;
function uniquerandom()
{
  var newtime=(new Date()).getTime(),random;
  if(lastrandom_time!=newtime&&lastrandom.length>0) lastrandom=[];
  do 
  {
   random=Math.floor(Math.random() * 9999);
  } while (lastrandom.indexOf(random)!=-1);
  lastrandom.push(random);
  return (newtime*10000)+random;
} this.uniquerandom=uniquerandom();


this.postdecoders =
{
 'application/x-www-form-urlencoded': querystring.parse,
 'application/json': JSON.parse,
};


  // matches .xxxxx or [xxxxx] or ['xxxxx'] or ["xxxxx"] with optional [] at the end
  var chunks = /(?:(?:^|\.)([^\[\(\.]+)(?=\[|\.|$|\()|\[([^"'][^\]]*?)\]|\["([^\]"]*?)"\]|\['([^\]']*?)'\])(\[\])?/g;
  // Parse a key=val string.
  function add_to_object_by_name (obj, key, value) // a modified version of QueryString.parse = QueryString.decode 
  {
   try
   {
      var res=obj,next;
      key.replace(chunks, function (all, name, nameInBrackets, nameIn2Quotes, nameIn1Quotes, isArray, offset) {
        var end = offset + all.length == key.length;
        name = name || nameInBrackets || nameIn2Quotes || nameIn1Quotes;
        next = end ? value : {};
        //next = next && (+next == next ? +next : next);
        if (Array.isArray(res[name])) {
          res[name].push(next);
          res = next;
        } else {
          if (name in res) {
            if (isArray || end) {
              res = (res[name] = [res[name], next])[1];
            } else {
              res = res[name];
            }
          } else {
            if (isArray) {
              res = (res[name] = [next])[0];
            } else {
              res = res[name] = next;
            }
          }
        }
      });
    }
    catch(err)
    {
     err.message="error parsing variable names of post , form elements.\r\n"+err.message;
     err.stack="error parsing variable names of post , form elements.\r\n"+err.stack;
     throw err
    }
    return obj;
  };
  
  
var mylog='';
function upload_files(req, res, folder, callback) 
{
  //console.log("before post received:");
  //console.log(sys.inspect(req));
  var form = new formidable.IncomingForm();
  form.keepExtensions=true;
  form.uploadDir=folder;
  form.parse(req, function(err, fields, files) {
      //req.post=_.clone();
      //console.log(sys.inspect(req.post));
      
      req.post={};
      for(var p in fields)
      {
       if(fields.hasOwnProperty(p))
       {
        add_to_object_by_name(req.post,p,fields[p]);
       }
      }
      for(var p in files)
      {
       if(files.hasOwnProperty(p))
       {
        add_to_object_by_name(req.post,p,files[p]);
       }
      }
      callback(null,req.post);      
      delete form;
  });
  //var randomname='upload_'+uniquerandom()+exten;
  //savename=folder+randomname;
  //{filename:part.filename,path:savename,mime:part.headers['content-type']};
}


this.post=function (req, res, callback )
{//console.log(sys.inspect(req.post));
 //console.log("post received:");
 //console.log(sys.inspect(req.post));
 
 callback(req.post);
}

this.realpost=function (req, res, callback ) 
// called first of all to overcome a bug in node js 
// (it could be called any time in any page.
// but there is a bug: the request object dies at the end of a function,
// for example if the later work is done in a settimeout
// so to overcome i have renamed post to realpost
// called realpost as first thing in process request
// it continues to the callback
// later it uses the "post" merthod to get what was posted
// and fetched at the begining with realpost)
// when this bug is fixed i can rename back realpost to post.
{
 if(
  req.method==='POST'
  // || req.method=='PUT' 
 )
 {
  var content_type='';
  var decoder=false;
  if(req.headers['content-type'])
  {
   content_type=req.headers['content-type'].split(';')[0];
   if(this.postdecoders[content_type])
    decoder=this.postdecoders[content_type];
  }
  var data = '';
  if(req.headers['content-type'].indexOf('multipart/form-data')==-1) 
  {
    try
    {
     //console.log("POST6");
     req.setEncoding('utf8');
     //console.log(sys.inspect(req._events));
     req.on('data', function(chunk)
     {
      // console.log("POST7");
      data += chunk;
     });
     req.on('end', function()
     {
      //console.log("POST8");
      //req.postmime = content_type;
      //req.postraw = data;
      if(decoder)
      {
       try
       {
        req.post = decoder(data);
        callback(req.post);
       }
       catch (err)
       {
        callback({});
       }
      }
      else
      {
       //console.log("POST9");
       callback({});
      }
     });

    }catch(e){console.log(e.stack);}
    //console.log("post readble:"+(req.connection.readable));
    //req.resume();
  }
  else
  {
   //console.log("GONE TO UPLOAD FILES");
    upload_files(req, res,this.temp,function(error,data)
    {
     req.post = data;
     if(error!==null) callback({});
     else             callback(data);
    });
  }
 }
 else
 {
  callback({});
 }
}
 
this.referrer = function(req, res, callback) 
{
 // actualy no need call back here because it is not transfering any thing
 if(callback)
  callback(req, res,req.headers.referrer || req.headers.referer || "");
 else
  return req.headers.referrer || req.headers.referer || "";
}
 
this.redirect = function(req, res, url, callback, code )
{
 res.writeHead( code || 302, {'Location': url } );
 res.end();
 if(callback)callback();
};
 
 
function parseCookie(str)
{
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
            obj[key] = querystring.unescape(val, true);
        }
    }
    return obj;
} this.parseCookie=parseCookie; 
 
function cookie(req)
{
 if(req.headers.cookie)
 {
  req.parsedcookie=parseCookie(req.headers.cookie);
  return req.parsedcookie;
 }
 return {};
};this.cookie = cookie;

function get_user(req)
{
 var parsedcookie=cookie(req);  // cookie names are lowercase             
 if(parsedcookie['user_id'])
 {
  req.user_id=parsedcookie['user_id'];
  //req.user_hash=parsedcookie['user_hash'];
 }
 return parsedcookie;
} this.get_user=get_user; 

function save_user(req,header,user_id)
{
 var pid=upid// add hash later
 req.user_id=user_id;
 //req.user_pass=user_hash;
// header['Set-Cookie']='user_id="'+user_id+'"; path=/'+(req.secure?';');
 /*
 document.cookie = name + "=" +escape( value ) +
( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
( ( path ) ? ";path=" + path : "" ) +
( ( domain ) ? ";domain=" + domain : "" ) +
( ( secure ) ? ";secure" : "" );


 document.cookie ='user_id="'+uid+'";user_hash="'+pid+'"; path=/'+(req.secure?'; secure:':'')

 */
} this.save_user=save_user; 

function clear_user(req,header)
{
 req.user_id='';
 header['Set-Cookie']='user_id=;user_hash=; expires=Thu, 2 Aug 2001 20:47:11 UTC; path=/'+(req.secure?'; secure:':'');     
} this.clear_user=clear_user; 
 

/*
now i have a session module
function session_start(req,header)
{
 var parsedcookie=cookie(req),sid;  // cookie names are lowercase             
 if(parsedcookie['sid'])
 {
  req.session_id=parsedcookie['sid'];
 }
 else
 {
  sid=uniquerandom();//((newtime*10000)+(Math.floor(Math.random() * 9999)))
  req.session_id=sid;
  header['Set-Cookie']='sid="'+sid+'"; path=/'+(req.secure?'; secure:':'');
 }
 return parsedcookie;     
} this.session_start=session_start; 
 
function session_save(req)
{
 if(req.session_id);
} this.session_save=session_save;

function session_load(req)
{
 if(req.session_id);
} this.session_load=session_load;
*/ 


this.contentTypes = { // types from node paperboy 
  "aiff": "audio/x-aiff",
  "arj": "application/x-arj-compressed",
  "asf": "video/x-ms-asf",
  "asx": "video/x-ms-asx",
  "au": "audio/ulaw",
  "avi": "video/x-msvideo",
  "bcpio": "application/x-bcpio",
  "ccad": "application/clariscad",
  "cod": "application/vnd.rim.cod",
  "com": "application/x-msdos-program",
  "cpio": "application/x-cpio",
  "cpt": "application/mac-compactpro",
  "csh": "application/x-csh",
  "css": "text/css",
  "deb": "application/x-debian-package",
  "dl": "video/dl",
  "doc": "application/msword",
  "drw": "application/drafting",
  "dvi": "application/x-dvi",
  "dwg": "application/acad",
  "dxf": "application/dxf",
  "dxr": "application/x-director",
  "etx": "text/x-setext",
  "ez": "application/andrew-inset",
  "fli": "video/x-fli",
  "flv": "video/x-flv",
  "gif": "image/gif",
  "gl": "video/gl",
  "gtar": "application/x-gtar",
  "gz": "application/x-gzip",
  "hdf": "application/x-hdf",
  "hqx": "application/mac-binhex40",
  "html": "text/html",
  "ico": "image/x-icon",
  "ice": "x-conference/x-cooltalk",
  "ief": "image/ief",
  "igs": "model/iges",
  "ips": "application/x-ipscript",
  "ipx": "application/x-ipix",
  "jad": "text/vnd.sun.j2me.app-descriptor",
  "jar": "application/java-archive",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "js": "text/javascript",
  "json": "application/json",
  "latex": "application/x-latex",
  "lsp": "application/x-lisp",
  "lzh": "application/octet-stream",
  "m": "text/plain",
  "m3u": "audio/x-mpegurl",
  "man": "application/x-troff-man",
  "me": "application/x-troff-me",
  "midi": "audio/midi",
  "mif": "application/x-mif",
  "mime": "www/mime",
  "movie": "video/x-sgi-movie",
  "mp4": "video/mp4",
  "mpg": "video/mpeg",
  "mpga": "audio/mpeg",
  "ms": "application/x-troff-ms",
  "nc": "application/x-netcdf",
  "oda": "application/oda",
  "ogm": "application/ogg",
  "pbm": "image/x-portable-bitmap",
  "pdf": "application/pdf",
  "pgm": "image/x-portable-graymap",
  "pgn": "application/x-chess-pgn",
  "pgp": "application/pgp",
  "pm": "application/x-perl",
  "png": "image/png",
  "pnm": "image/x-portable-anymap",
  "ppm": "image/x-portable-pixmap",
  "ppz": "application/vnd.ms-powerpoint",
  "pre": "application/x-freelance",
  "prt": "application/pro_eng",
  "ps": "application/postscript",
  "qt": "video/quicktime",
  "ra": "audio/x-realaudio",
  "rar": "application/x-rar-compressed",
  "ras": "image/x-cmu-raster",
  "rgb": "image/x-rgb",
  "rm": "audio/x-pn-realaudio",
  "rpm": "audio/x-pn-realaudio-plugin",
  "rtf": "text/rtf",
  "rtx": "text/richtext",
  "scm": "application/x-lotusscreencam",
  "set": "application/set",
  "sgml": "text/sgml",
  "sh": "application/x-sh",
  "shar": "application/x-shar",
  "silo": "model/mesh",
  "sit": "application/x-stuffit",
  "skt": "application/x-koan",
  "smil": "application/smil",
  "snd": "audio/basic",
  "sol": "application/solids",
  "spl": "application/x-futuresplash",
  "src": "application/x-wais-source",
  "stl": "application/SLA",
  "stp": "application/STEP",
  "sv4cpio": "application/x-sv4cpio",
  "sv4crc": "application/x-sv4crc",
  "swf": "application/x-shockwave-flash",
  "tar": "application/x-tar",
  "tcl": "application/x-tcl",
  "tex": "application/x-tex",
  "texinfo": "application/x-texinfo",
  "tgz": "application/x-tar-gz",
  "tiff": "image/tiff",
  "tr": "application/x-troff",
  "tsi": "audio/TSP-audio",
  "tsp": "application/dsptype",
  "tsv": "text/tab-separated-values",
  "txt": "text/plain",
  "unv": "application/i-deas",
  "ustar": "application/x-ustar",
  "vcd": "application/x-cdlink",
  "vda": "application/vda",
  "vivo": "video/vnd.vivo",
  "vrm": "x-world/x-vrml",
  "wav": "audio/x-wav",
  "wax": "audio/x-ms-wax",
  "wma": "audio/x-ms-wma",
  "wmv": "video/x-ms-wmv",
  "wmx": "video/x-ms-wmx",
  "wrl": "model/vrml",
  "wvx": "video/x-ms-wvx",
  "xbm": "image/x-xbitmap",
  "xlw": "application/vnd.ms-excel",
  "xml": "text/xml",
  "xpm": "image/x-xpixmap",
  "xwd": "image/x-xwindowdump",
  "xyz": "chemical/x-pdb",
  "zip": "application/zip"
};

this.charsets = {
  'text/javascript': 'UTF-8',
  'text/html': 'UTF-8',
  'text/css': 'UTF-8'
};
