Ext.define('bo.sim.Processor', {
  extend: 'Ext.util.Observable',
  config: {
    timeline: null,
    cores: null,
    queue: null,
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
  applyCores: function (cores) {
    cores = Ext.Array.from(cores);
    return Ext.Array.map(cores, function (core) {
      if (core.isInstance) {
        core.setProcessor(this);
      } else {
        core.processor = this;
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
    this.fireEvent('beforeprocess', this, time);
    //trzeba procesory przetwarzać fazami, gdyż
    //nie może się zdarzyć, że

    var i, cores = this.getCores(), nCores = cores.length;
    for (i = 0; i < nCores; i++) {
      cores[i].processPhase1(time);//tutaj kończone są zadania
    }

    this.fireEvent('process', this, time);//tutaj obiekty zewnętrzne mogą dodać np zadanie do kolejki

    for (i = 0; i < nCores; i++) {
      cores[i].processPhase2(time);//tutaj pobierane są zadania
    }
    this.fireEvent('afterprocess', this, time);
    if (tl.hasNextTime()) {
      Ext.defer(this.process, this.getSimSpeed(), this);
    }
    else {
      this.fireEvent('finish', this, time);
    }
  }
});