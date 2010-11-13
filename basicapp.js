/*
there is:
app                                             // application
app.[lib name]=lib                              // dependency sharing
app.models.[model name]=model object            // models
app.pages.[controller name]=controller object   // controllers
app.url_routes.[route name]=route object        // application routes

templates:
temlates are parts of a templates object:
var tempaltes_object={
load_tempalts:{temaplte_name1:"filename.html"},
prepere_templates:{temaplte_name2:function(vars,callback){var echo=""; if(callback)callback(echo);else return echo;}}, // never used actualy
prepeare_data:function(currenttempaltename,callback){ var template_prepere_data={}; callback(template_prepere_data);} 
}

there is a shared function of prepere a templates object.
aftrer it is ran:

the result is a tempaltes object with functions by their names:

var tempaltes_object={
load_tempalts:{temaplte_name1:"filename.html"},
prepere_templates:{temaplte_name2:function(vars,callback){var echo=""; if(callback)callback(echo);else return echo;}}, // never used actualy
prepeare_data:function(currenttempaltename,callback){ var template_prepere_data={}; callback(template_prepere_data);} 
}

temaplte_name1:function(...){...}
temaplte_name2:function(...){...}

you use templates like this:
tamplates_object.function(vars,callback);

a template:

structure of a tempaltes function:

function(vars,callback)
{
 var echo="";
 //my code is here
 if(callback)
  callback(echo);
 else
  return echo;
}

example of a tempalte and the result:
template.html:
hello world <?if(vars.name){?><?=vars.name?><?}?>

function(vars,callback)
{
 var echo="";
 echo +="hello world ";
 if(vars.name){
  echo +=vars.name;
 }
 if(callback)
  callback(echo);
 else
  return echo;
}

*/

var app={};this.app = app;


app.libs={};


app.autoreload       = require('deps/node-hot-reload'); app.autoreload.path=__dirname;
app._                = require('deps/nodejs-clone-extend/merger');  //  lets do: _.extend(same,otherobjexts),  _.clone(obj) - creates new reference, see source to understand //
app.jsinc            = require('deps/jsinc').jsinc;
app.linq             = app.jsinc(__dirname+'/deps/jslinq/scripts/JSLINQ.js').window.JSLINQ;
//app.datejs           = app.jsinc(__dirname+'/deps/datejs/build/date-he-IL.js',{"Date":Date});
//console.log(app.datejs.CultureInfo);
app.phpjs            = require('phpjs'); // http://phpjs.org/packages/view/2693/name:806d77a73ce93d851a4620f4a788acd7
app.date             = app.jsinc(__dirname+'/deps/date/date.js');
//app.date             = require('deps/date/date');

app.path             = require('path');
app.fs               = require('fs');
app.doubletemplate   = require('deps/nodejs-meta-templates/doubletemplate');;
app.httputils        = require('httputils');
app.httprequest      = require('deps/node-utils/request/lib/main');
app.ObjectID         = require('deps/node-mongodb-native/lib/mongodb/bson/bson').ObjectID;
app.step             = require('deps/step/lib/step');
app.sys              = require('sys');
app.inflow           = require('deps/node-inflow');
app.url              = require('url');   // allaws to parse urls                        

app.files_path=__dirname+'/files/';
app.root_path=__dirname;
app.templates_path=__dirname+'/templates/'; app.doubletemplate.templates_path=app.templates_path;

app.server={port:8000};
app.websocket={port:8000};
app.database={name:'test',server:'localhost',port:27017};
app.models={};
app.urls_route_before=[];
app.url_routes=[];
app.url_routes_after=[];  

app.menus={}; 
app.collections={};


require('./basicapp_shared_templates').main(app);

require('./basicfields').main(app);
require('./basicmodel').main(app);

require('./basicapp_loaddata').main(app);
require('./basicapp_subitems').main(app);

require('./basicapp_handle_request').main(app);
require('./basicapp_extend_request').main(app);
require('./basicapp_init').main(app);
require('./basicapp_pages').main(app);
require('./dbutil').main(app);

/*
// auto reload httputils modul during development

   app.autoreload.watchrel("httputils.js", function (newmodule)
   {
    app.httputils=newmodule;
   });
*/