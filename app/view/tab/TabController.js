/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('bo.view.tab.TabController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.tab',
  config: {
    plain: null
  },
  statics: {
    cnt: 0
  },
  addRow: function () {
    var tasks = this.getViewModel().get('tasks');
    var time = tasks.last() ? tasks.last().get('time') : 0;
    tasks.add({time: time, size: 1});
  },
  removeRow: function () {
    var tasks = this.getViewModel().get('tasks');
    var grid = this.lookupReference('grid');
    var selected = grid.getSelection();
    tasks.remove(selected);
  },
  init: function () {
    var tasks = this.getViewModel().get('tasks');
    tasks.on({
      scope: this,
      update: this.updateChart,
      datachanged: this.updateChart,
      add: this.assignColor
    });
    this.getView().setTitle('Seria ' + ++this.self.cnt);

    var plain = this.getPlain();
    var data = [];
    if (plain) {
      var rows = plain.split('\n');
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i].split(' ');
        row.push(this.createColor());
        data.push(row)
      }
      tasks.setData(data);
    }
    this.lookupReference('corevis').getController().setChart(this.lookupReference('chart'));

  },
  colorTable: [
    '#0000FF', '#FFA500', '#778899', '#228B22', '#FF0000', '#20B2AA', '#8A2BE2', '#FFD700', '#3E467D', '#00FF7F', '#FF9966', '#33CC33', '#008080', '#000033 ', '#F2644A', '#996633', '#FFCC66  ', '#87CEFA', '#F08080', '#6666FF', '#FF6347', '#66FF33', '#D2B48C'
  ],
  createColor: function () {
    var a = this.colorTable[0];
    this.colorTable.push(this.colorTable.shift());
    return a;
  },
  assignColor: function (store, records) {
    for (var i = 0; i < records.length; i++) {
      var rec = records[i];
      if (Ext.isEmpty(rec.get('color')))
        rec.set('color', this.createColor());
    }
  },
  updateChart: function () {
    var tasks = this.getViewModel().get('tasks');

    var processor = Ext.create('bo.sim.Processor', {
      queue: {
        //capacity:4
      },
      eventBus: {
        logEvents: false
      },
      coreDefaults: {
        performance: 1
      },
      cores: [
        {},
        {}
      ]
    });
    var producer = Ext.create('bo.sim.TaskProducer', {
      processor: processor,
      taskDefaults: {
        partSize: 2,
      },
      tasks: Ext.Array.map(tasks.getRange(), function (rec) {
        return {
          enqueueTime: rec.get('time'),
          size: rec.get('size'),
          color: rec.get('color')
        }
      })
    });


    var coreVisController = this.lookupReference('corevis').getController();
    coreVisController.setProcessor(processor);
    coreVisController.setTaskStore(tasks);
    processor.start();
    ///
    this.getViewModel().get('unfinished').setData(processor.getOutput().getTimelineForProperty('unfinished'));
    this.getViewModel().get('numTasks').setData(processor.getOutput().getTimelineForProperty('numTasks'));

  }
});
