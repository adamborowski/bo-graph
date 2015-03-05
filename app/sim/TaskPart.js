Ext.define('bo.sim.TaskPart', {
  extend: 'Ext.util.Observable',
  config: {
    task: null,
    size: 0,
    startTime: null,
    finishTime: null
  },
  constructor: function (config) {
    this.initConfig(config);
    this.callParent(arguments);
  },
  start: function () {
    this.fireEvent('start', this);
  },
  finish: function () {
    this.fireEvent('finish', this);
  }
});