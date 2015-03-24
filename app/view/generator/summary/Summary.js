Ext.define('bo.view.generator.summary.Summary', {
  xtype: 'generator.summary',
  extend: 'Ext.Panel',
  controller: {
    type: 'generator.summary'
  },
  viewModel: {
    type: 'generator.summary'
  },
  layout: {
    type: 'vbox',
    align: 'stretch',
    pack: 'stretch'
  },
  items: [
    {
      xtype: 'cartesian',
      flex: 1,
      animation: false,
      reference: 'aChart',
      axes: [
        {
          type: 'numeric',
          fields: 'propability',
          minimum:0,
          position: 'left',
          grid: true,
          title: 'p(a)'
        },
        {
          type: 'numeric',
          fields: 'from',
          position: 'bottom',
          grid: true,
          title: 'a[s]'
        }
      ],
      series: [{
        type: 'area',
        xField: 'from',
        yField: 'propability',
        style: {
          //lineWidth: 0,
          fillStyle: '#d33d03',
          //strokeStyle: '#ca3355',
        }
      }]
    },
    {
      xtype: 'cartesian',
      flex: 1,
      animation: false,
      reference: 'bChart',
      axes: [
        {
          type: 'numeric',
          fields: 'propability',
          position: 'left',
          grid: true,
          minimum:0,
          title: 'p(b)'
        },
        {
          type: 'numeric',
          fields: 'from',
          position: 'bottom',
          grid: true,
          title: 'b[j.o.]'
        }
      ],
      series: [{
        type: 'area',
        xField: 'from',
        yField: 'propability',
        style: {
          //lineWidth: 0,
          fillStyle: '#ca3dd3',
          //strokeStyle: '#ca3355',
        }
      }]
    }
  ]
});