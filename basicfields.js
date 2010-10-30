this.main=function(app)
{

    app.defaultvalidation=function ()
    {
     return {valid:true,message:''};
    }
    
    app.defaultfield= 
      {
      
       collections_meshup:        {},
       
       general:        { title : 'id', ftype : 'string', size : '20',  primerykey : false, page : 1, autoupdatevalue : null, /* initial value */ },
       list:           { use: true, agregate : null, width : null, ftype: 'text' /* text / image */, wrap : true, quicksearch: true, extsearch: false, tempalte:null /* null or custom template function or file name etc */, },
       view:           { use: true, title: null,                   ftype: 'text' /* text / image */, },
       edit:           { use: true, title: null, readonly:false,   ftype: 'text' /* text / date / password / radio / checkbox / select / textarea / html / file / hidden */, },
       add:            { use: true, /*default_value: '',*/ },
       multiupdate:    { use: true, },
       advancedsearch: { use: true, operator1: 'like', operator2:'like', /*  user select / > / < / >= / <= / between / like / not like / starts with / ends with */ tempalte:null /* null or custom template function orfile name etc */, },
       viewtag:        {
       
        div:   { use:false, bold: false, italic : false, align: 'right', /* right / left / center */ direction: '',  /* '' / ltr / rtl */   attributes: '' /* right / left / center */,  lookup: null,  },
        image: { height: 0, width: 0, resize: false, alt:'', align: 'right', /* right / left / center */ attributes: '',  lookup: null, },
        link:  { prefix: '', suffix: '', herffield: "", /* name of a field */ originalvalue: false,  lookup: null, },

        text:      { size: 30, maxlength: null, attributes: '', lookup: null, }, 
        password:  { size: 30, maxlength: null, attributes: '', }, 
        radio:     { attributes: '', lookup: null, }, 
        checkbox:  { attributes: '', lookup: null, },
        select:    { size: 1,  multiple : false, attributes: '', lookup: null, }, 
        textarea:  { cols: 48,  rows: 4, attributes: '', },
        html:      { cols: 48,  rows: 4, attributes: '', }, 
        date:     { cols: 48,  rows: 4, attributes: '', },
        file:      { size: 30, attributes: '', resizeimage: false, resizeheight: 0, resizewidth: 0, resizetype: 'jpg', /* jpg / png*/ }, 
        hidden:    { customvalue: '', attributes: '', },
        validation:{ validate: false, type:'' /* date/phone... */, regex:'', required:false,  errormessage: '', /* addition to error mesage */ userfunc:app.defaultvalidation, },
        lookup:    { sameasedit:false, values: {}, /* key-value object array */ usetable: false, tablename: '', linkedfield: '', displayfield: '', displayfield2: '', orderby: '', ascdesc: '', /* '' / asc / desc */ filter: '', distinct: false, filterfield: '', parentfield: '', },
        tempalte:false /* null or custom template function or file name etc */,
       },
       edittag:        {
        text:      { size: 30, maxlength: null, attributes: '', lookup: false, }, 
        password:  { size: 30, maxlength: null, attributes: '', }, 
        radio:     { attributes: '', lookup: false, }, 
        checkbox:  { attributes: '', lookup: false, },
        select:    { size: 1,  multiple : false, attributes: '', lookup: false, }, 
        textarea:  { cols: 48,  rows: 4, attributes: '', },
        html:      { cols: 48,  rows: 4, attributes: '', },
        date:     { cols: 48,  rows: 4, attributes: '', }, 
        file:      { size: 30, attributes: '', resizeimage: false, resizeheight: 0, resizewidth: 0, resizetype: 'jpg', /* jpg / png*/ }, 
        hidden:    { customvalue: '', attributes: '', },
        validation:{ validate: false, type:'' /* date/phone... */, regex:'', required:false,  errormessage: '', /* addition to error mesage */ userfunc:app.defaultvalidation, },
        lookup:    {                   values: {}, /* key-value object array */ usetable: false, tablename: '', linkedfield: '', displayfield: '', displayfield2: '', orderby: '', ascdesc: '', /* '' / asc / desc */ filter: '', distinct: false, filterfield: '', parentfield: '', },
        tempalte:false /* null or custom template function or file name etc */,
       },
      }  /* end field */; 
     

    app.basicfields=
    {
      _id:     app._.cloneextend(app.defaultfield,{general:{title : 'id', pimerykey:true, ftype : 'number'},add:{use:false},edit:{use:false,readonly:true}}) ,
      normal: app._.cloneextend(app.defaultfield,{general:{}}),
    };
    app.basicfields.text     = app._.cloneextend(app.basicfields.normal, { });
    app.basicfields.textarea = app._.cloneextend(app.basicfields.normal, { edit:{ftype:'textarea'}});
    app.basicfields.html     = app._.cloneextend(app.basicfields.normal, { edit:{ftype:'html'}});
    app.basicfields.date     = app._.cloneextend(app.basicfields.normal, { edit:{ ftype:'date'}});
    app.basicfields.number   = app._.cloneextend(app.basicfields.normal, { edittag: { validation: { validate: false, type: 'number'} }, general: { ftype: 'number'} });
    app.basicfields.lookup   = app._.cloneextend(app.basicfields.normal, { edit: { ftype: 'select' }, edittag: { select: { lookup: true }, lookup: { usetable: true}} });
    app.basicfields.keyvalue = app._.cloneextend(app.basicfields.normal, { edit: { ftype: 'select' }, edittag: { select: { lookup: true }, lookup: { usetable: false}} });
    app.basicfields.file     = app._.cloneextend(app.basicfields.normal, { edit: { ftype: 'file' } });
  
}