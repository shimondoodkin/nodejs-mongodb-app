this.main=function main(app)
{
    app.editfields=
    {
     pagefilename:__filename,
     prepeare_templates:{},
     load_templates:  // texts treated as templates filenames to load and prepeare
     {
      checkbox:"editfields/checkbox.html",
      date:"editfields/date.html",
      file:"editfields/file.html",
      hidden:"editfields/hidden.html",
      image:"editfields/image.html",
      number:"editfields/number.html",
      password:"editfields/password.html",
      radio:"editfields/radio.html",
      select:"editfields/select.html",
      text:"editfields/text.html",
      textarea:"editfields/textarea.html",
      html:"editfields/html.html",     
     },
    };
    
    app.viewfields=
    {
     pagefilename:__filename,
     prepeare_templates: {},
     load_templates:  // texts treated as templates filenames to load and prepeare
     {
      div:"viewfields/div.html",
      link:"viewfields/link.html",
      image:"viewfields/image.html",
      //additional might be good idea
      checkbox:"viewfields/checkbox.html",
      date:"viewfields/date.html",
      file:"viewfields/file.html",
      hidden:"viewfields/hidden.html",
      //image:"viewfields/image.html",
      number:"viewfields/number.html",
      password:"viewfields/password.html",
      radio:"viewfields/radio.html",
      select:"viewfields/select.html",
      text:"viewfields/text.html",
      textarea:"viewfields/textarea.html",
      html:"viewfields/html.html",     
     },
    };
    
    app.templates=
    {
     pagefilename:__filename,
     prepeare_templates: {},
     load_templates:  // texts treated as templates filenames to load and prepeare
     {
      admin:"admin.html",
     },
    };
 
    app.load_app_templates=function(callback)
    {
     app.doubletemplate.load_templates1(app.templates);
     app.doubletemplate.load_templates1(app.editfields);
     app.doubletemplate.load_templates1(app.viewfields);      
     if(callback)callback(callback);
    };   
}