Ext.define('bo.sim.TaskPart', {
  extend: 'Ext.util.Observable',
  config: {
    task: null,
    size: 0,
    startTime: null,
    finishTime: null,
    order: 0
  },
  constructor: function (config) {
    this.initConfig(config);
    this.callParent(arguments);
  },
  toString: function () {
    return Ext.String.format("{0} P{1}", this.getTask().toString(), this.getOrder());
  },
  start: function (core) {
    this.core = core;
    core.getProcessor().getEventBus().registerEvent(this, 'part started')
    this.fireEvent('start', this);
  },
  finish: function () {
    this.core.getProcessor().getEventBus().registerEvent(this, 'part finished')
    this.fireEvent('finish', this);
  }
});