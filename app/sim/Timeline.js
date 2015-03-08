Ext.define('bo.sim.Timeline', {
  constructor: function (config) {
    this.initConfig(config);
    this.times = [0];//zawsze na początku musi pójść nextTime
  },
  /**
   * wprowadza do obsługi punkt czasu
   * @param time
   */
  registerTime: function (time) {
    var a = this.times;
    var timeIndex = Ext.Array.binarySearch(a, time, Ext.Array.numericSortFn);
    if (a[timeIndex-1] != time)
      a.splice(timeIndex, 0, time);
  },
  /**
   * @return time
   */
  nextTime: function () {
    return this.currentTime = this.times.shift();
  },
  getCurrentTime: function () {
    return this.currentTime;
  },
  hasNextTime: function () {
    return this.times.length;
  }
});