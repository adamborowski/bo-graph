Ext.define('bo.sim.Task', {
  config: {
    size: 1,
    enqueueTime: 0,
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
        task: this,
        size: Math.min(size, size - i),
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
  consumePart: function () {
    var part = this.unconsumedParts.pop();
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
    this.finishedParts.put(taskPart);
    if (this.isFinished()) {
      //nie ma ani niezaczętych ani zaczętych zadań, ogłoś koniec
      this.fireEvent('finish', this);
    }
  },
  isFinished: function () {
    return this.unconsumedParts.length == 0 && this.consumedParts.length == 0
  }

});