this.main=function(app)
{
    app.basicmodel=
    {
     fields:
     {
     },
     modelname:"set in serving.js",
     collection:null, //handle to main mongodb collection
     links:[], //handle to main mongodb collection
     empty_object:{},
     general:
     {
      urlprefix:'model',
      use:true,
      name:'list',
      load_collections:[], //names of mongodb collection to also load
      title:'List',
      filter: null,
      sort: null,
      main: false,
      menu_item: true,
     },
     list:
     {
      use:false,
      inline_add:false,
      inline_copy:false,
      inline_edit:false,
      grid_edit:false,
      must_search:false,
     },
     view:
     {
      use:false,
     },
     add:
     {
      add:true,
      copy:false,
      captcha:false,
      confirm:false,
     },
     del:
     {
      use:false,
      confirm:true,
     },
     edit:
     {
      edit:true,
      confirm:false,
     },
     multiupdate:
     {
      use:false,
      confirm:true,
     },
     search:
     {
      quick:true,
      advanced:false,
      hightlight:false,
     },
     audit:
     {
      use:false,
     },
     email:
     {
      onadd:false,
      onedit:false,
      ondelete:false,
     }
    };
    require('./basicmodel_preprocess').main(app);
    require('./basicmodel_crud').main(app);
    require('./basicmodel_setup').main(app);
}