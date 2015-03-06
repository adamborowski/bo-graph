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
    a.splice(Ext.Array.binarySearch(a, time, Ext.Array.numericSortFn), 0, time);
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