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
      width: '100%',
      flex: 1,
      insetPadding: 40,
      innerPadding: {
        left: 40,
        right: 40
      },
      sprites: [{
        type: 'text',
        text: 'Remaining Work',
        fontSize: 22,
        width: 100,
        height: 30,
        x: 40, // the sprite x position
        y: 20  // the sprite y position
      }, {
        type: 'text',
        text: 'Data: Browser Stats 2012',
        fontSize: 10,
        x: 12,
        y: 470
      }, {
        type: 'text',
        text: 'Source: http://www.w3schools.com/',
        fontSize: 10,
        x: 12,
        y: 485
      }],
      axes: [{
        type: 'numeric',
        fields: 'data1',
        position: 'left',
        grid: true,
        minimum: 0,
        maximum: 24,
        //renderer: function (v, layoutContext) {
        //  // Custom renderer overrides the native axis label renderer.
        //  // Since we don't want to do anything fancy with the value
        //  // ourselves except appending a '%' sign, but at the same time
        //  // don't want to loose the formatting done by the native renderer,
        //  // we let the native renderer process the value first.
        //  return layoutContext.renderer(v) + '%';
        //}
      }, {
        type: 'category',
        fields: 'month',
        position: 'bottom',
        grid: true,
        label: {
          rotate: {
            degrees: -45
          }
        }
      }],
      series: [{
        type: 'line',
        xField: 'month',
        yField: 'data1',
        style: {
          lineWidth: 4
        },
        marker: {
          radius: 4
        },
        label: {
          field: 'data1',
          display: 'over'
        },
        highlight: {
          fillStyle: '#000',
          radius: 5,
          lineWidth: 2,
          strokeStyle: '#fff'
        },
        tooltip: {
          trackMouse: true,
          style: 'background: #fff',
          showDelay: 0,
          dismissDelay: 0,
          hideDelay: 0,
          renderer: function (storeItem, item) {
            this.setHtml(storeItem.get('month') + ': ' + storeItem.get('data1') + '%');
          }
        }
      }]
    }
  ]
});
