/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('bo.view.tab.TabModel', {
  extend: 'Ext.app.ViewModel',

  alias: 'viewmodel.tab',

  data: {
    name: 'Tab'
  },
  stores: {
    tasks: {
      //sorters: [
      //  {
      //    property: 'time',
      //    direction: 'ASC'
      //  }
      //],
      model: 'bo.model.Task'
    },
    numTasks: {
      model: 'bo.model.ChartModel'
    },
    unfinished: {
      model: 'bo.model.ChartModel'
    },
    numFailed: {
      model: 'bo.model.ChartModel'
    }
  }
});