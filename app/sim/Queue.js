Ext.define('bo.sim.Queue', {
  config: {
    size: Infinity
  },
  constructor: function (config) {
    this.initConfig(config);
    this.tasks = [];
  },
  addTask: function (task) {
    if (this.task.length + 1 == this.getSize()) return false;
    this.tasks.push(task);
    return true;
  },
  getLength: function () {
    return this.tasks.length;
  },
  finishTask: function (task) {
    Ext.Array.remove(this.tasks, task);
  },
  /**
   * zwraca kwant zadania
   * @param partSize number|null jeśli null to zwraca zadanie które jest nienadgryzione
   */
  getTaskPart: function (partSize) {

  }
});