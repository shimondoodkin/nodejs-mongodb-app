var fs = require('fs');    // allaws to open files
var sys=require('sys');
var Buffer=require('buffer').Buffer;

function recource_dir(parse_file_list_dirname,addcallback)
{
 var parse_file_list1 = function(dir, files)
 {
  for (var i=0;i<files.length;i++)
  {
   var file = dir+'/'+files[i];
   (function()
    {
     var file_on_callback = file;
     //sys.puts('file assigned: '+ file_on_callback);
     fs.stat(file_on_callback,
     function(err,stats)
     {
      //sys.puts('stats returned: '+ file);
      if (err)
      {
       // do nothing
       // sometimes linked files are missing
       //sys.puts('auto restart - cannot read file1 : '+ file_on_callback);
      }
      else
      {
       if (stats.isDirectory())
        fs.readdir(file_on_callback,function(err,files){
         if (err) 
         {
          // do nothing
          // sometimes linked files are missing
          //sys.puts('auto restart - cannot read file2 : '+ file_on_callback);
         }
         else
          parse_file_list1(file_on_callback, files);
        });
       else if (stats.isFile() ) 
       {
        addcallback(file_on_callback);
        //eval("f= function(){restart_server('"+file_on_callback+"');};");fs.watchFile(file_on_callback, f); //probably may consume resources , but also tells whitch file
        //fs.watchFile(file_on_callback, restart_server);                                                   //this one consumes less resiurces
       }
      }
     });
    }
   )(); // This creates and executes a new function with its own scope.
  }
 };
 fs.readdir(parse_file_list_dirname,function(err,files)
 {
  if (err) 
  {
   // do nothing
   // sometimes linked files are missing
   //sys.puts('auto restart -cannot read file3: '+ parse_file_list_dirname);
  }
  else
   parse_file_list1(parse_file_list_dirname, files);
 }); 
}

var contentTypes = { // types from node paperboy 
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

var charsets = {
  'text/javascript': 'UTF-8',
  'text/html': 'UTF-8',
  'text/css': 'UTF-8'
};

this.page=function(app,url,dirpath,reg_include,reg_exclude,hotreload,debugit)
{
 if(typeof debugit==='undefined')debugit=false;
 var page=
     {
      pagefilename:__filename,
      pageurl:url, //prefix name
      urlmatch:'pathbegins', //urlmatch: path / pathbegins 
      
      load_templates:{}, //dummy
      prepeare_templates: {},  //dummy
      prepere_data:function (page,template_name,callback){}, //dummy
      
      etag:(new Date).getTime() ,  //my etag is the last time i loaded the application - last cache 
       
      main:function (shared,route_i)
       {
        var req=shared.req,res=shared.res,page=shared.page;
      
       //sys.puts('cachefile page main ');
       if(false&&req.headers['if-none-match'] == this.etag)
       {
        res.writeHead(304, { 'Content-Length': 0 });
        res.end();
       }
       else
       {
        var relative=req.parsedurl.pathname.substring(this.pageurl.length+2,req.parsedurl.pathname.length);
        if(typeof this.files[relative]==='undefined')
        {
      //   res.writeHead(404, { 'Content-Type': 'text/html', 'ETag':this.etag, 'Cache-control':  'max-age=172800', 'Expires':  expires.toUTCString(),  });
      //   res.write( "Not Found" );
      //   sys.puts('cachefile page ' + url + ' relative ' + relative + ' file not found... "' + req.parsedurl.pathname + '"');
      //   res.end();
         return false;
        }
        else
        {
         //sys.puts('cachefile page ' + url + ' relative ' + relative + ' served... "' + req.parsedurl.pathname + '"'); 
         var file=this.files[relative];
         var expires = new Date;
         expires.setTime( expires.getTime() +  -172800 ); // two days in seconds 172800
         res.writeHead(200, { 'Content-Type': file[0] , 'Content-Length': file[1], 'ETag':this.etag, 'Cache-control':  'max-age=0, must-revalidate', 'Expires': expires.toUTCString() });
         res.write( file[2] );
         res.end();
         delete expires;
        }
       }
       return true;
      },
      files:
      {
      },
     };
     
  var dir=__dirname+'/'+dirpath,dirlen=dir.length+1;
  recource_dir(dir,
   function (filename)
   {
    var relateive=filename.substring(dirlen,filename.length),reg_inc=(reg_include!=false),reg_exc=(reg_exclude!=false);
    if (reg_exc?reg_exclude.test(relateive):false) // if regex not defined ignore it
    {
     //if(debugit)sys.puts('cache folder: not loading '+relateive);
     return;
    }
    if (reg_inc?reg_include.test(relateive):true) // if regex not defined ignore it
    {
     process.nextTick(function ()
     {
      fs.readFile(filename, function (err, data)
      {
        if (err)
        {
         //sys.puts('error loading ' + relateive + ' ' + err); 
         err=null;
         return;
        }
        else
        {
         var ext=relateive.substring(relateive.lastIndexOf('.')+1,relateive.length);
         var contenttype=contentTypes[ext] || 'application/octet-stream';
         var charset=charsets[contenttype]?charsets[contenttype]:false;
         //if(debugit) sys.puts('cache folder: loading '+relateive);
         page.files[relateive] = [
           contenttype+(charset?'; charset=' + charset:''), //0
           data.length, //1
           data//,      //2
           //ext,       //
          ];
         //page.files[relateive].push(page.files[relateive].length);
        }
      });
      if(hotreload)
      {
       //console.log((new Date).toString()+' watch cached file: '+filename);
       fs.watchFile(filename, function ()
       {
        console.log((new Date).toString()+' reload cached file: '+filename);
        page.etag=(new Date).getTime() ,  //my etag is the last time i loaded the application - last cache
        // it is change  etag and the function that above 
        fs.readFile(filename, function (err, data)
        {
          if (err)
          {
           //sys.puts('error loading ' + relateive + ' ' + err); 
           err=null;
           return;
          }
          else
          {
           var ext=relateive.substring(relateive.lastIndexOf('.')+1,relateive.length);
           var contenttype=contentTypes[ext] || 'application/octet-stream';
           var charset=charsets[contenttype]?charsets[contenttype]:false;
           //sys.puts('cache folder: loading '+relateive);
           page.files[relateive] = [
             contenttype+(charset?'; charset=' + charset:''), //0
             data.length, //1
             data//,      //2
             //ext,       //
            ];
           //page.files[relateive].push(page.files[relateive].length);
          }
        });
       });
      }
     });
    }
   }
  ); 

 return page; 
} ;

