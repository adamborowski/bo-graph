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
    this.getView().setTitle('Seria ' + ++this.self.cnt);
    var tasks = this.getViewModel().get('tasks');
    var plain = this.getPlain();
    var data = [];
    if (plain) {
      var rows = plain.split('\n');
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i].split(' ');
        data.push(row)
      }
      tasks.setData(data);
    }
    tasks.on({
      scope: this,
      update: this.updateChart,
      datachanged: this.updateChart
    });
    this.updateChart();
  },
  updateChart: function () {
    var tasks = this.getViewModel().get('tasks');

    var processor = Ext.create('bo.sim.Processor', {
      queue: {
        //capacity:4
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
      tasks: Ext.Array.map(tasks.getRange(), function (rec) {
        return {
          enqueueTime: rec.get('time'),
          size: rec.get('size')
        }
      })
    });

    processor.start();

    ///
    this.getViewModel().get('unfinished').setData(processor.getOutput().getTimelineForProperty('unfinished'));
    this.getViewModel().get('numTasks').setData(processor.getOutput().getTimelineForProperty('numTasks'));
  }
});
