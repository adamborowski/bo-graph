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
    type: 'border',
  },
  items: [
    {
      xtype: 'grid',
      region: 'west',
      title: 'zgłoszenia',
      collapsible: true,
      collapsed: false,
      collapseFirst: false,
      titleCollapse: true,
      width: 200,
      reference: 'grid',
      selModel: {
        mode: 'MULTI'
      },
      viewConfig: {
        markDirty: false
      },
      bind: {
        store: '{tasks}'
      },
      plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1
      },
      tools: [
        {
          tooltip: 'dodaj wiersz',
          type: 'plus',
          handler: 'addRow'
        },
        {
          tooltip: 'usuń zaznaczone',
          type: 'minus',
          handler: 'removeRow'
        }
      ],
      columns: {
        defaults: {
          sortable: false,
          menuDisabled: true
        },
        items: [
          {
            text: 'n',
            xtype: 'rownumberer'
          },
          {
            dataIndex: 'color',
            width: 24,
            renderer: function (color, meta) {
              meta.tdStyle = "background: " + color;
            }
          },
          {
            text: 't+',
            xtype: 'numbercolumn',
            dataIndex: 'time',
            flex: 1,
            editor: {
              xtype: 'numberfield',
              step: 0.1
            }
          },
          {
            text: 'b',
            dataIndex: 'size',
            xtype: 'numbercolumn',
            flex: 1,
            editor: {
              xtype: 'numberfield',
              step: 0.1
            }
          }
        ]
      }
    },
    {
      xtype: 'panel',
      padding:1,
      region: 'center',
      layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'stretch'
      },
      items: [
        {
          xtype: 'corevis',
          reference: 'corevis',
          flex: 0.7
        },
        {
          xtype: 'cartesian',
          animation: false,
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
          animation: false,
          reference: 'chart_n_t',
          bind: {
            store: '{numTasks}'
          },
          flex: 0.5,
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
              fillStyle: '#3d4542'
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
    }
  ]

});


//TODO zrobić wizualizację: w pionie numer zadania (partu) a w pioziomie czas - bloczki (przed narodzeniem, oczekiwanie, przetwarzane, gotowe)