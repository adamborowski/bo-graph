Ext.define('bo.sim.TaskProducer', {
  config: {
    tasks: [],
    processor: null,
    taskDefaults: {}
  },
  applyTasks: function (tasks) {
    tasks = Ext.Array.from(tasks);
    return Ext.Array.map(tasks, function (task, ord) {
      if (!task.isInstance) {
        Ext.apply(task, this.getTaskDefaults());
        task = Ext.create('bo.sim.Task', task);
      }
      task.setOrder(ord);
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
      tl.registerTime(task.getEnqueueTime());
    }, this);
    this.remainingTasks = Ext.Array.clone(this.getTasks());
  },
  onProcessorProcess: function (processor, time) {
    var tasks = this.remainingTasks;
    var queue = processor.getQueue();
    for (var currentTask = tasks[0]; currentTask && currentTask.getEnqueueTime() == time; tasks.shift(), currentTask = tasks[0]) {
      //dodawaj taski o ile należą do tego punktu w czasie
      queue.addTask(currentTask);
    }
  }
});