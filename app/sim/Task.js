Ext.define('bo.sim.Task', {
  config: {
    size: 1,
    startTime: 0,
    partSize: Infinity,
    parts: null
  },
  constructor: function (config) {
    this.initConfig(config);
    var ps = this.getPartSize();
    var size = this.getSize();
    var parts = [];
    for (var i = 0; i < size; i += ps) {
      parts.push(Ext.create('bo.sim.TaskPart', {
        task: this
      }));
    }
    this.setParts(parts);
    // części które są przydzielone jakiemuś procesorowi
    this.unconsumedParts = Ext.Array.clone(parts);
    // części które czekają na obsługę
    this.consumedParts = [];
  },
  /**
   * pobieramy część lub całość zadania
   * @param delta
   */
  consume: function () {
    var part = this.unconsumedParts.pop();
    if (part) {
      this.consumedParts.push(part);
    }
    return part;
  },
  getRemainingParts: function () {
    return this.unconsumedParts.length;
  },


});