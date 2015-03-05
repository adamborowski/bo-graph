Ext.define('bo.sim.TaskProducer', {
  config: {
    tasks: [],
    processor: null
  },
  applyTasks: function (tasks) {
    tasks = Ext.Array.from(tasks);
    return Ext.Array.map(tasks, function (task) {
      if (!task.isInstance)
        task = Ext.create('bo.sim.Task', task);
      return task;
    }, this);
  },
  updateProcessor: function (processor) {
    if (processor) {
      processor.on('process', this.onProcessorProcess, this);
    }
  },
  constructor: function (config) {
    this.initConfig(config);
    this.callParent(arguments);
    var tl = this.getProcessor().getTimeline();
    //todo skopiować z cas14 mixina do commit dirty
    Ext.each(this.getTasks(), function (task) {
      tl.registerTime(task.getStartTime());
    }, this);
    this.remainingTasks = Ext.Array.clone(this.getTasks());
  },
  onProcessorProcess: function (processor, time) {
    var tasks = this.remainingTasks;
    var queue = processor.getQueue();
    if (tasks.length) {
      for (var currentTask = tasks[0]; currentTask.getStartTime() == time; tasks.shift()) {
        //dodawaj taski o ile należą do tego punktu w czasie
        queue.addTask(currentTask);
      }
    }
  }
});