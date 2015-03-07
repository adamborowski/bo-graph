Ext.define('bo.sim.PropertyTimeline', {
  extend: 'bo.sim.Timeline',
  constructor: function (config) {
    this.initConfig(config);
    this.times = [{time: 0}];//zawsze na początku musi pójść nextTime
  },
  /**
   * wprowadza do obsługi punkt czasu
   * @param time
   */
  registerTime: function (time, props) {
    var a = this.times;
    var timeIndex = Ext.Array.binarySearch(a, time, function (_a, _b) {
      return _a - _b.time
    });
    var propertyObject = this.times[timeIndex];
    if (propertyObject && propertyObject.time == time) {
      Ext.apply(propertyObject, props);
      return propertyObject;
    }
    else {
      props.time = time;
      a.splice(timeIndex, 0, props);
      return props;
    }
  },
  registerTimeForArrayInsert: function (time, property, newItem) {
    var timeObject = this.registerTime(time, {});
    if (timeObject[property] == null)timeObject[property] = [];
    timeObject[property].push(newItem);
  },
  getTimelineForProperty: function (prop) {
    var a = this.times;
    var ret = [];
    for (var i = 0; i < a.length; i++) {
      var time = a[i];
      if (time[prop] != null) {
        ret.push(time);
      }
    }
    return ret;
  }
});