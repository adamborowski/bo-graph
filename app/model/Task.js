Ext.define('bo.model.Task', {
  extend: 'Ext.data.Model',
  fields: [
    {
      name: 'interval',
      type: 'number'
    },
    {
      name: 'size',
      type: 'number'
    }, {
      name: 'color',
      type: 'string'
    },//after simulation
    {
      name: 'startTime',
      type: 'number'
    },
    {
      name: 'finishTime',
      type: 'number'
    },
    {
      name: 'delay',//queue delay
      type: 'number'
    },
    {
      name: 'systemDelay',
      type: 'number'
    },
    {
      name: 'enqueueTime',
      type: 'number'
    }
  ]
});