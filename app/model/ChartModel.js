Ext.define('bo.model.ChartModel', {
  extend: 'Ext.data.Model',
  fields: [
    'time', 'unfinished', 'numTasks', 'numFailed','failedTasks'
  ]
});