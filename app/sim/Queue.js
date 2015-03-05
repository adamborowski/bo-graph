Ext.define('bo.sim.Queue', {
  config: {
    size: Infinity,
    processor: null
  },
  constructor: function (config) {
    this.initConfig(config);
    this.unconsumedTasks = [];//zadania które mają min. 1 wolny part
    this.fullConsumedTasks = [];//zadania które nie mają już wolnego partu
  },
  addTask: function (task) {
    if (this.task.length + 1 == this.getSize()) return false;
    this.unconsumedTasks.push(task);
    task.on('finish', this.onTaskFinish, this);
    return true;
  },
  getLength: function () {
    return this.unconsumedTasks.length + this.fullConsumedTasks.length;
  },
  canConsumeTaskPart: function () {
    return this.unconsumedTasks.length > 0;
  },
  /**
   * zwraca kwant zadania
   */
  consumeTaskPart: function () {
    var task = this.unconsumedTasks[0];
    var part = task.consumePart();
    if (!task.canConsumeTaskPart()) {
      this.unconsumedTasks.shift();
      this.fullConsumedTasks.push(task);
    }
    return part;
  },
  onTaskFinish: function (task, time) {
    //skoro task został już całkowicie zakończony, można go usunąć z kolejki
    Ext.Array.remove(this.unconsumedTasks, task);
  }
});