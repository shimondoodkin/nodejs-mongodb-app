/*
Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.editorConfig = function( config )
{
 config.defaultLanguage = 'he';
 config.enterMode = CKEDITOR.ENTER_P; //CKEDITOR.ENTER_BR; //CKEDITOR.ENTER_P //CKEDITOR.ENTER_DIV
 config.contentsLangDirection = 'rtl';
 
 //config.toolbar = 'Full'; // Full / Basic
 config.toolbar = 'MyToolbar';
 config.toolbar_MyToolbar =
 [
        ['Cut','Copy','Paste','PasteText','PasteFromWord'],
        ['Undo','Redo','-','Find','Replace','-','SelectAll',],
        ['Image','Flash','Table','HorizontalRule','SpecialChar','PageBreak'],
        ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
        '/',
        ['RemoveFormat','Format','Bold','Italic','Strike','-','Subscript','Superscript','-','TextColor','BGColor'],
        ['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],
        ['Link','Unlink','Anchor'],
        ['Source','Maximize']
 ];
  
 //CKEDITOR.config.scayt_autoStartup=false;
 config.removePlugins = 'elementspath,save,font,scayt';
 config.forceEnterMode = true;
 config.disableNativeSpellChecker = false;
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
};
