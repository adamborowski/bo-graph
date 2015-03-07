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
    type: 'fit'
  },

  items: [
    {
      bind: {
        title: '{name}'
      },
      region: 'center',
      xtype: 'tabpanel',
      tools: [
        {
          type: 'plus',
          tooltip: 'Dodaj',
          handler: 'onClickButton'
        },
        {
          type: 'collapse',
          tooltip: 'Wklej',
          handler: 'onPasteClickButton'
        }
      ],
      reference: 'tabs',
    }
  ]
});
