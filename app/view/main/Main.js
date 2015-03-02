/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('bo.view.main.Main', {
  extend: 'Ext.container.Container',
  requires: [
    'bo.view.main.MainController',
    'bo.view.main.MainModel'
  ],

  xtype: 'app-main',

  controller: 'main',
  viewModel: {
    type: 'main'
  },

  layout: {
    type: 'border'
  },

  items: [{
    xtype: 'panel',
    bind: {
      title: '{name}'
    },
    region: 'west',
    width: 250,
    split: true,
    tbar: [{
      text: 'Dodaj',
      handler: 'onClickButton'
    },
      {
        text: 'Wklej',
        handler: 'onPasteClickButton'
      }]
  }, {
    region: 'center',
    xtype: 'tabpanel',
    reference: 'tabs',
  }]
});
