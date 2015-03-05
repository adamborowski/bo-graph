Ext.define('bo.sim.Queue', {
  config: {
    size: Infinity,
    processor: null
  },
  constructor: function (config) {
    this.initConfig(config);
    this.tasks = [];//zadania które mają min. 1 wolny part
    this.fullConsumedTasks = [];
  },
  addTask: function (task) {
    if (this.task.length + 1 == this.getSize()) return false;
    this.tasks.push(task);
    task.on('finish', this.onTaskFinish, this);
    return true;
  },
  getLength: function () {
    return this.tasks.length + this.fullConsumedTasks.length;
  },
  canConsumePart: function () {
    return this.tasks.length > 0;
  },
  /**
   * zwraca kwant zadania
   */
  consumeTaskPart: function () {
    var task = this.tasks[0];
    var part = task.consume();
    if (!task.canConsumePart()) {
      this.tasks.shift();
      this.fullConsumedTasks.push(task);
    }
    return part;
  },
  onTaskFinish: function (task, time) {
    //skoro task został już całkowicie zakończony, można go usunąć z kolejki
    Ext.Array.remove(this.tasks, task);
  }
});