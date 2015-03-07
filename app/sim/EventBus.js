Ext.define('bo.sim.EventBus', {
  extend: 'Ext.util.Observable',
  config: {
    logEvents: true,
    processor: null
  },
  constructor: function (config) {
    this.initConfig(config);
    this.callParent(arguments);
    this.events = [];
  },
  getEvents: function (type) {
    if (type == null)
      return this.events;
    else return Ext.Array.filter(this.events, function (e) {
      return e.type == type
    });
  },
  registerEvent: function (object, msg) {
    var event = {
      object: object,
      unitName: object.$className.match(/\w*$/)[0],
      time: this.getProcessor().getTimeline().getCurrentTime(),
      message: msg
    };//todo moze Ext.data.Model
    if (object.toString() != '[object Object]') {
      event.str = object.toString()
    } else event.str = event.unitName;
    this.events.push(event);
    this.fireEvent('register', this, event);
    if (this._logEvents) {
      console.info(Ext.String.format("{0} {1} {2} - {3}", Ext.String.leftPad(event.time, 5, ' '), Ext.String.leftPad(event.unitName, 14, ' '), Ext.String.leftPad(event.str, 14, ' '), event.message));
    }
  }
});