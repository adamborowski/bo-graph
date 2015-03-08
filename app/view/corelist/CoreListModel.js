Ext.define('bo.view.corelist.CoreListModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.corelist',
  data: {
    queueSize: 0,
    delta: 0
  },
  stores: {
    cores: {
      model: 'bo.model.Core',
      data: [
        [1],
        [1]
      ]
    }
  }

});
