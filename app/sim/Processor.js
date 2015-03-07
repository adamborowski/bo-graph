Ext.define('bo.sim.Processor', {
  extend: 'Ext.util.Observable',
  config: {
    timeline: {},
    eventBus: {},
    output: {},
    cores: [],
    queue: {},
    coreDefaults: {},
    simSpeed: 0 //ile ms zajmuje jeden cykl (0 - niezauważalnie, 1000 - procesory będą pracowały nad jednym kwantem jedną sekundę)
  },
  applyQueue: function (queue) {
    queue = queue || {};
    if (queue.isInstance) {
      queue.setProcessor(this);
    }
    else {
      queue.processor = this;
      queue = Ext.create('bo.sim.Queue', queue);
    }
    return queue;
  },
  applyEventBus: function (bus) {
    bus = bus || {};
    if (bus.isInstance) {
      bus.setProcessor(this);
    }
    else {
      bus.processor = this;
      bus = Ext.create('bo.sim.EventBus', bus);
    }
    return bus;
  },
  applyOutput: function (timeline) {
    timeline = timeline || {};
    if (timeline.isInstance) {
      timeline.setProcessor(this);
    }
    else {
      timeline.processor = this;
      timeline = Ext.create('bo.sim.PropertyTimeline', timeline);
    }
    return timeline;
  },
  applyTimeline: function (timeline) {
    timeline = timeline || {};
    if (timeline.isInstance) {
      timeline.setProcessor(this);
    }
    else {
      timeline.processor = this;
      timeline = Ext.create('bo.sim.Timeline', timeline);
    }
    return timeline;
  },
  applyCores: function (cores) {
    cores = Ext.Array.from(cores);
    return Ext.Array.map(cores, function (core, order) {
      if (core.isInstance) {
        core.setProcessor(this);
        core.setOrder(order);
      } else {
        core.processor = this;
        core.order = order;
        Ext.apply(core, this.getCoreDefaults());
        core = Ext.create('bo.sim.Core', core);
      }
      return core;
    }, this);
  },
  constructor: function (config) {
    this.initConfig(config);
    this.callParent(arguments);
  },
  start: function () {
    this.fireEvent('start', this, 0);
    this.process();
  },
  process: function () {
    var tl = this.getTimeline();
    var time = tl.nextTime();
    var o = this.getOutput(), q = this.getQueue();
    o.registerTime(time, {
      numTasks: q.getLength()
    });
    this.fireEvent('beforeprocess', this, time);
    //trzeba procesory przetwarzać fazami, gdyż
    //nie może się zdarzyć, że
    var i, cores = this.getCores(), nCores = cores.length;
    for (i = 0; i < nCores; i++) {
      cores[i].processPhase1(time);//tutaj kończone są zadania
    }

    o.registerTime(time, {
      unfinished: q.getUnfinished()
    });
    this.fireEvent('process', this, time);//tutaj obiekty zewnętrzne mogą dodać np zadanie do kolejki
    o.registerTime(time, {
      unfinished: q.getUnfinished()
    });
    for (i = 0; i < nCores; i++) {
      cores[i].processPhase2(time);//tutaj pobierane są zadania
    }
    this.fireEvent('afterprocess', this, time);

    this.getOutput().registerTime(time, {
      numTasks: this.getQueue().getLength()
    });

    if (tl.hasNextTime()) {
      Ext.defer(this.process, this.getSimSpeed(), this);
    }
    else {
      this.fireEvent('finish', this, time);
    }
  }
});