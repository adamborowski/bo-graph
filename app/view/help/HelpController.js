Ext.define('bo.view.help.HelpController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.helpwindow',
  constructor: function (config) {
    this.initConfig(config);
    this.callParent(arguments);
  },
  init: function () {
    this.store = bo.app.getStore('LocalStore');
    this.updateData();
    this.lookupReference('helpContent').on({
      scope: this,
      delegate: '#doNotShowHelpAtStartupBtn',
      element: 'el',
      click: this.onToggleClick
    });
  },
  onToggleClick: function () {
    var s = this.store.findRecord("key", "doNotShowHelpAtStartup");
    if (s == null) {
      s = this.store.add({
        key: 'doNotShowHelpAtStartup',
        value: true
      })[0];
    }
    else {
      s.set('value', !s.get('value'));
    }
    this.store.sync();
    this.updateData();
  },
  updateData: function () {
    var s = this.store.findRecord("key", "doNotShowHelpAtStartup");
    var data = {
      showOnStartup: !(s && s.get('value') == true)
    };
    this.lookupReference('helpContent').setData(data);
  }
});