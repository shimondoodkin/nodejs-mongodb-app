var _ = require('merger');  //  lets do: _.extend(same,otherobjexts),  _.clone(obj) - creates new reference, see source to understand // 
var sys = require('sys');

function setupfirst(app)
{
 //modify self and others 
 app.database.name='webappdb';
} this.setupfirst=setupfirst;

function add_models(app)
{
 // create model "simple"
 app.models.simple                = _.clone(  app.basicmodel );
 app.models.simple.general.name   = 'mainpage';
 app.models.simple.general.urlprefix = 'mainpage';
 app.models.simple.general.title  = 'Main Page';
 app.models.simple.fields.title   = _.extend( _.clone(app.basicfields.normal),{general:{title:'Title'}} );
 
 // create model "example"
 app.models.example                = _.cloneextend(  app.basicmodel,
 {
  general:
  {
    name:      'mainpage',
    urlprefix: 'mainpage', //  http://myapp.com/admin/[prefix]/edit.html
    title:     'Main Page'
  },
  fields:
  {
   title   : _.cloneextend(app.basicfields.normal),{general:{title:'Title'}} );
   text    : _.cloneextend(app.basicfields.normal),{general:{title:'Text on Main Page'},edit:{ftype:'dhtml'}} );
   footer  : _.cloneextend(app.basicfields.normal),{general:{title:'Footer of the website'},edit:{ftype:'dhtml'}} );
  }
 });
 app.models.example.links.push ( {name:"othercollection",url:"othercollection.html",func:function (data){ return this.url+'?id='+data.id }} );
 

} this.add_models=add_models;

function setup(app) // exported constructor
{
  add_models(app);
} this.setup=setup;

function setuplast(app)
{
  //add_pages_and_urls(app);
 //verify self and others
} this.setuplast=setuplast;
