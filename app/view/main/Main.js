/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('bo.view.main.Main', {
  extend: 'Ext.panel.Panel',
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
  dockedItems: [
    {
      xtype: 'toolbar',
      cls: 'a-main-toolbar',
      dock: 'top',
      items: [
        {
          xtype: 'label',
          bind: {
            html: '{name}'
          }
        },
        '->',
        {
          text: 'menu',
          menu: [
            {
              text: 'Nowa sesja',
              menu: {
                items: [
                  {
                    text: 'Pusta',
                    handler: 'onClickButton'
                  },
                  {
                    text: 'Ze schowka',
                    handler: 'onPasteClickButton'
                  }
                ]
              }
            },
            {
              text: 'Generuj strumień zgłoszeń'
            },
            '-',
            {
              text: 'O programie',
              handler: 'onAboutClick'
            }

          ]
        }
      ]
    }
  ],
  items: [
    {
      region: 'center',
      xtype: 'tabpanel',
      reference: 'tabs',
      defaults: {
        closable: true
      },
      plugins: 'tabreorderer'
    }
  ]
});
