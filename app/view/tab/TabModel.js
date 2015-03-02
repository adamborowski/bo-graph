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
      sorters: [
        {
          property:'time',
          direction:'ASC'
        }
      ],
      model: 'bo.model.Task'
    }
  }

  //TODO - add data, formulas and/or methods to support your view
});