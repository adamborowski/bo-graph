Ext.define('bo.sim.Task', {
  extend: 'Ext.util.Observable',
  config: {
    size: 1,
    color: null,
    enqueueTime: 0,
    partSize: Infinity,
    parts: null,
    order: 0
  },
  toString: function () {
    return Ext.String.format("T{0}({1}j)", this.getOrder(), this.getSize());
  },
  constructor: function (config) {
    this.initConfig(config);
    this.callParent(arguments);
    var ps = this.getPartSize();
    var size = this.getSize();
    var parts = [];
    for (var i = 0; i < size; i += ps) {
      var partSize = Math.min(ps, size - i);
      parts.push(Ext.create('bo.sim.TaskPart', {
        task: this,
        order: parts.length,
        size: partSize,
        listeners: {
          scope: this,
          finish: this.onTaskPartFinish
        }
      }));
    }
    this.setParts(parts);
    // części które są przydzielone jakiemuś procesorowi
    this.unconsumedParts = Ext.Array.clone(parts);
    // części które czekają na obsługę
    this.consumedParts = [];
    this.finishedParts = [];
  },
  /**
   * pobieramy część lub całość zadania
   * @param delta
   */
  consumePart: function (core) {
    this.core = core;
    core.getProcessor().getEventBus().registerEvent(this, 'task started')
    var part = this.unconsumedParts.shift();
    if (part) {
      this.consumedParts.push(part);
    }
    return part;
  },
  canConsumeTaskPart: function () {
    return this.unconsumedParts.length;
  },
  onTaskPartFinish: function (taskPart) {
    Ext.Array.remove(this.consumedParts, taskPart);
    this.finishedParts.push(taskPart);
    if (this.isFinished()) {
      //nie ma ani niezaczętych ani zaczętych zadań, ogłoś koniec
      this.fireEvent('finish', this);
      this.core.getProcessor().getEventBus().registerEvent(this, 'task finished')
    }
  },
  isFinished: function () {
    return this.unconsumedParts.length == 0 && this.consumedParts.length == 0
  },
  getUnfinished: function () {
    return this.getSize() - this.getWorkDone();
  },
  getWorkDone: function () {
    var s = 0, i;
    for (i = 0; i < this.unconsumedParts.length; i++) {
      s += this.unconsumedParts[i].getWorkDone();
    }
    for (i = 0; i < this.consumedParts.length; i++) {
      s += this.consumedParts[i].getWorkDone();
    }
    for (i = 0; i < this.finishedParts.length; i++) {
      s += this.finishedParts[i].getWorkDone();
    }
    return s;
  }

});