Ext.define('bo.helper.Dygraph', {
  xtype: 'dygraph',
  extend: 'Ext.Component',
  cls: 'a-dygraph',
  config: {
    options: {},
    chartData: null
  },
  constructor: function (config) {
    this.callParent(arguments);
  },
  updateChartData: function (data) {
    if (!this.rendered) {
      this.on('render', function () {
        this.updateChartData(this.getChartData());
      }, this)
      return;
    }
    if (this.g)this.g.destroy();
    var opts = Ext.applyIf({}, this.getOptions());
    this.g = new Dygraph(this.el.dom, data, opts);
  }
});