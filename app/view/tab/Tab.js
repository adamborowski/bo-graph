/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('bo.view.tab.Tab', {
  xtype: 'app-tab',
  extend: 'Ext.panel.Panel',

  requires: [],

  controller: {
    type: 'tab'
  },
  viewModel: {
    type: 'tab'
  },

  layout: {
    type: 'vbox',
    align: 'stretch',
    pack: 'stretch'
  },
  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'top',
      ui: 'footer',
      items: [
        {
          text: 'dodaj wiersz',
          handler: 'addRow'
        },
        {
          text: 'usuń zaznaczone',
          handler: 'removeRow'
        }
      ]
    }
  ],
  items: [
    {
      xtype: 'grid',
      height: 250,
      reference: 'grid',
      selModel: {
        selType: 'cellmodel',
        mode: 'MULTI'
      },

      bind: {
        store: '{tasks}'
      },
      plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1
      },
      columns: [
        {
          text: 'l.p.',
          xtype: 'rownumberer'
        },
        {
          text: 'czas przybycia',
          xtype: 'numbercolumn',
          dataIndex: 'time',
          width: 120,
          editor: {
            xtype: 'numberfield',
            step: 0.1
          }
        },
        {
          text: 'wielkość zgłoszenia',
          dataIndex: 'size',
          xtype: 'numbercolumn',
          width: 140,
          editor: {
            xtype: 'numberfield',
            step: 0.1
          }
        }
      ]
    },
    {
      xtype: 'cartesian',
      reference: 'chart',
      bind: {
        store: '{unfinished}'
      },
      flex: 1,
      sprites: [],
      axes: [{
        type: 'numeric',
        fields: 'unfinished',
        position: 'left',
        grid: true,
        title: 'U(t)'
      }, {
        type: 'numeric',
        fields: 'time',
        position: 'bottom',
        grid: true,
        title: 't[s]'
      }],
      series: [{
        type: 'area',
        xField: 'time',
        yField: 'unfinished',
        style: {
          lineWidth: 0
        },
        marker: {
          radius: 2,
          lineWidth: 4
        },
        highlight: {
          fillStyle: '#fff',
          radius: 5,
          lineWidth: 2,
          strokeStyle: '#000'
        },
        tooltip: {
          trackMouse: true,
          style: 'background: #fff',
          showDelay: 0,
          dismissDelay: 0,
          hideDelay: 0,
          renderer: function (rec, item) {
            this.setHtml(Ext.String.format('U({0})={1}', rec.get('time'), rec.get('unfinished')));
          }
        }
      }]
    }, {
      xtype: 'cartesian',
      reference: 'chart_n_t',
      bind: {
        store: '{numTasks}'
      },
      flex: 1,
      sprites: [],
      axes: [{
        type: 'numeric',
        fields: 'numTasks',
        position: 'left',
        grid: true,
        title: 'N(t)'
      }, {
        type: 'numeric',
        fields: 'time',
        position: 'bottom',
        grid: true,
        title: 't[s]'
      }],
      series: [{
        type: 'area',
        xField: 'time',
        yField: 'numTasks',
        style: {
          lineWidth: 0,
          fillStyle:'#3d4542'
        },
        highlight: {
          fillStyle: '#fff',
          radius: 5,
          lineWidth: 2,
          strokeStyle: '#000'
        },
        tooltip: {
          trackMouse: true,
          style: 'background: #fff',
          showDelay: 0,
          dismissDelay: 0,
          hideDelay: 0,
          renderer: function (rec, item) {
            this.setHtml(Ext.String.format('N({0})={1}', rec.get('time'), rec.get('numTasks')));
          }
        }
      }]
    }
  ]

});
