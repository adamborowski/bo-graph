Ext.define('bo.view.corelist.CoreListController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.corelist',
  addRow: function () {
    var store = this.getView().getStore();
    var lastRec = this.getView().getSelection()[0];
    if (lastRec == null)lastRec = store.last();
    if (lastRec) {
      store.add(lastRec.copy(null));
    }
    else {
      store.add({});
    }
  },
  removeRow: function () {
    var tasks = this.getView().getStore();
    if (tasks.getCount() > 1) {
      var grid = this.getView();
      var selected = grid.getSelection();
      tasks.remove(selected.length ? selected : tasks.last());
    }
  },
  initViewModel: function () {
    this.getViewModel().get('cores').on({
      scope: this,
      datachanged: this.onUpdate,
      update: this.onUpdate
    });
    this.getViewModel().bind('{queueSize}{delta}', this.onUpdate, this);
  },
  onUpdate: function () {
    this.fireEvent('coreupdate', this);
  },
  getCores: function () {
    return Ext.Array.map(this.getViewModel().get('cores').getRange(), function (core) {
      return core.getData();
    });
  },
  getDelta: function () {
    return this.getViewModel().get('delta');
  },
  getQueueSize: function () {
    return this.getViewModel().get('queueSize');
  }
});
