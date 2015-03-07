Ext.define('bo.sim.Queue', {
  extend: 'Ext.util.Observable',
  config: {
    capacity: Infinity,
    processor: null
  },

  applyCapacity: function (a) {
    if (a == 0)return Infinity;
    return a;
  },
  constructor: function (config) {
    this.initConfig(config);
    this.callParent(arguments);
    this.unconsumedTasks = [];//zadania które mają min. 1 wolny part
    this.fullConsumedTasks = [];//zadania które nie mają już wolnego partu
  },
  addTask: function (task) {
    if (this.getLength() == this.getCapacity()) return false;
    this.unconsumedTasks.push(task);
    this.getProcessor().getEventBus().registerEvent(this, Ext.String.format('task {0} added', task.toString()));
    task.on('finish', this.onTaskFinish, this);
    return true;
  },
  getLength: function () {
    return this.unconsumedTasks.length + this.fullConsumedTasks.length;
  },
  getUnfinished: function () {
    var s = 0, i;
    for (i = 0; i < this.unconsumedTasks.length; i++) {
      s += this.unconsumedTasks[i].getUnfinished();
    }
    for (i = 0; i < this.fullConsumedTasks.length; i++) {
      s += this.fullConsumedTasks[i].getUnfinished();
    }
    return s;
  },
  canConsumeTaskPart: function () {
    return this.unconsumedTasks.length > 0;
  },
  /**
   * zwraca kwant zadania
   */
  consumeTaskPart: function (core) {
    var task = this.unconsumedTasks[0];

    var part = task.consumePart(core);
    if (!task.canConsumeTaskPart()) {
      this.unconsumedTasks.shift();
      this.fullConsumedTasks.push(task);
    }
    else {
      //task nie został zabrany w całośc - przekaruzeluj na koniec
      this.unconsumedTasks.push(this.unconsumedTasks.shift());
    }
    return part;
  },
  onTaskFinish: function (task, time) {
    //skoro task został już całkowicie zakończony, można go usunąć z kolejki
    Ext.Array.remove(this.fullConsumedTasks, task);
    this.fireEvent('taskExit', this, task, time);
  }
});