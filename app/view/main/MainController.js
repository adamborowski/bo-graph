/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('bo.view.main.MainController', {
  extend: 'Ext.app.ViewController',

  requires: [
    'Ext.window.MessageBox'
  ],

  alias: 'controller.main',
  init: function () {
    var tabs = this.lookupReference('tabs');
    var newTab = tabs.add({
      xtype: 'app-tab',
      controller: {
        plain: '0.5 3\n2 2\n5 2\n6.5 3'
      }
    });
    tabs.setActiveItem(newTab);
  },
  onClickButton: function () {
    var tabs = this.lookupReference('tabs');
    var newTab = tabs.add({
      xtype: 'app-tab',
      controller: {}
    });
    tabs.setActiveItem(newTab);
  },
  onPasteClickButton: function () {
    Ext.Msg.prompt("Wklej wartości", "W każdym wierszu podaj dwie wartości: czas przybycia i wielkość zadania", function (button, value) {
          if (button == 'ok') {
            var tabs = this.lookupReference('tabs');
            var newTab = tabs.add({
              xtype: 'app-tab',
              controller: {
                plain: value
              }
            });
            tabs.setActiveItem(newTab);
          }
        },
        this, true, '0.5 1\n1 2\n4 5\n4.5 1'
    )
    ;
  },

  onConfirm: function (choice) {
    if (choice === 'yes') {
      //
    }
  }
});
