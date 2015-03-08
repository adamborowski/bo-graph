Ext.define('bo.model.Task', {
  extend: 'Ext.data.Model',
  fields: [
    {
      name: 'time',
      type: 'number',
    }, {
      name: 'size',
      type: 'number'
    }, {
      name: 'color',
      type: 'string'
    }, 'startTime', 'finishTime', 'delay'
  ]
});