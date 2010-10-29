## The idea:
the idea is to create somthing similar to hkvstore.com's Phpmaker or Aspmaker or Microsoft Dot.NET 3 sp1 DynamicData application.

an application runtime generation framework. to generate nodejs+mongodb(+nginx) applications.
in those modes of development you configure the data models, and all else is kind of, 
generated or code reused, 
to allow to create data managment web application quickly and easyly with very little effort.

## links:

http://www.asp.net/dynamicdata

http://www.hkvstore.com/phpmaker/


The first idea about application structure was:
the application is a single aplication but i can be defined in several moduls.

now i find it hard to implement everything i shared objects.

## Logical app object model:
   '- application
      |- shared_models
      |- shared_templates of the application
      |- shared_pages of pages
      '- shared_url_routes

###the same in words:

the application object is shared and accesible between all moduls in the application. 
a module contains a part of application definition functions and objects.
application definition can be spread between many moduls for convinience

a module extends the application object or the application's shared objects boted in the tree chart above.

it is posible to define a model in a module, then call kind of a macro function 
that adds all (edit,add,delete,list) functions and templates and urls to the application 
as defined by that model.
also you can define all those by your self so you can make custom pages.

## templates system:
what is good about phpmaker is that it allows you easyly define an application,
what is good in dot net DynamicData is that the templates are like components.
in templates you have: fields/textfiled.html, paritials/grid.html, pages/list.html 
at 1st all files composed together. later it is used as template.
