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
    bo.app.mainController = this;
    var tabs = this.lookupReference('tabs');
    var newTab = tabs.add({
      xtype: 'app-tab',
      controller: {
        plain: '0.5 3\n2 2\n5 2\n6.5 3'
      }
    });
    tabs.setActiveItem(newTab);


    //this.onGenerator();

  },
  addTab: function (tab) {
    var tabs = this.lookupReference('tabs');
    tab = tabs.add(tab);
    tabs.setActiveItem(tab);
    return tab;
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
    Ext.Msg.prompt("Wklej wartości", "W każdym wierszu podaj dwie wartości: interwał i wielkość zadania", function (button, value) {
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
  },
  onAboutClick: function () {
    Ext.Msg.alert('O programie', "Narzędzie do analizy procesów kolekowych.<br/>\nWykonano w celach edukacyjnych.<br/>\n<p>Wykorzystane biblioteki\n<ul>\n    <li>ExtJS 5 <a href=\"http://dev.sencha.com/ext/5.0.0/\" target=\"blank\">sencha.com</a></li>\n    <li>SimJS <a href=\"http://simjs.com/random.html\" target=\"blank\">simjs.com</a></li>\n    <li>Dygraphs <a href=\"http://dygraphs.com/\">dygraphs.com</a></li>\n</ul>\n</p>\n<h4>&copy; 2015 Adam Borowski</h4>");
  },
  onGenerator: function () {
    var w = Ext.widget('generator', {});
    w.show()

  }
});
