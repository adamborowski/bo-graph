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
        Ext.applyIf(task, this.getTaskDefaults());
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
    this.numFailed = 0;
    this.failedTasks = [];
  },
  onProcessorProcess: function (processor, time) {
    var tasks = this.remainingTasks;
    var queue = processor.getQueue();
    var failedTasks = [];
    for (var currentTask = tasks[0]; currentTask && currentTask.getEnqueueTime() == time; tasks.shift(), currentTask = tasks[0]) {
      //dodawaj taski o ile należą do tego punktu w czasie
      var success = queue.addTask(currentTask);
      if (!success) {
        this.numFailed++;
        failedTasks.push(currentTask);
      }
    }

    if (this.lastFail)
      this.failedTasks.push(Ext.applyIf({time: time}, this.lastFail));
    this.lastFail = {time: time, numFailed: this.numFailed, failedTasks: failedTasks};
    this.failedTasks.push(this.lastFail);
    //processor.getOutput().registerTime(time, {
    //  numFailed: numFailed,
    //  failedTasks: failedTasks
    //})
  }
});