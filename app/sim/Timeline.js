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

  },
  /**
   * @return time
   */
  nextTime: function () {
    return this.times.shift();
  },
  hasNextTime: function () {
    return this.times.length;
  }
});