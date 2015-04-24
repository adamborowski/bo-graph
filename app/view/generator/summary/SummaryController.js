Ext.define('bo.view.generator.summary.SummaryController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.generator.summary',
  config: {
    store: null
  },
  constructor: function (config) {
    this.initConfig(config);
    this.callParent(arguments);
  },
  doSummary: function (aStore, bStore, means) {
    this.setStore(aStore);
    this.lookupReference('aChart').setStore(aStore);
    this.lookupReference('bChart').setStore(bStore);
    this.fireEvent('summarychange', aStore, bStore, means);
  }
});