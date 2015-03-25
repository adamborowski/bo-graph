var USE_CHART_ANIMATION = false;
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
    type: 'border'
  },
  items: [
    {
      region: 'west',
      layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'stretch'
      },
      width: 330,
      title: 'zgłoszenia',
      collapsible: true,
      collapsed: false,
      collapseFirst: false,
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
      items: [
        {
          xtype: 'grid',
          flex: 1,
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
                text: 'a<sub>n</sub>',
                xtype: 'numbercolumn',
                dataIndex: 'time',
                renderer: function (value, meta, record, rowIndex,colIndex, store) {
                  if (rowIndex == 0)return value;
                  return value - store.getAt(rowIndex - 1).data.time;
                },
                flex: 1,
                editor: {
                  xtype: 'numberfield',
                  step: 0.1
                }
              },
              {
                text: 'b<sub>n</sub>',
                dataIndex: 'size',
                xtype: 'numbercolumn',
                flex: 1,
                editor: {
                  xtype: 'numberfield',
                  step: 0.1
                }
              },
              {
                text: 't*<sub>n</sub>',
                dataIndex: 'startTime',
                xtype: 'numbercolumn',
                flex: 1,
                editor: false,
                tdCls: 'a-cell-readonly',
                emptyCellText: '-'
              },
              {
                text: 't<sup>-</sup><sub>n</sub>',
                dataIndex: 'finishTime',
                xtype: 'numbercolumn',
                flex: 1,
                editor: false,
                tdCls: 'a-cell-readonly',
                emptyCellText: '-'
              },
              {
                text: 'w<sub>n</sub>',
                xtype: 'numbercolumn',
                flex: 1,
                dataIndex: 'delay',
                editor: false,
                tdCls: 'a-cell-readonly',
                emptyCellText: '-'
              }
            ]
          }
        },
        {
          xtype: 'corelist',
          reference: 'coreList',
          dock: 'bottom',
          minHeight: 70,
          height: 250,
          animCollapse: false
        }
      ]
    },
    {
      xtype: 'panel',
      padding: 1,
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
          interactions:'crosszoom',
          animation: USE_CHART_ANIMATION,
          reference: 'chart',
          flex: 1,
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
        },
        {
          xtype: 'cartesian',
          animation: USE_CHART_ANIMATION,
          reference: 'chart_n_t',
          flex: 0.5,
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
        },
        {
          xtype: 'cartesian',
          animation: USE_CHART_ANIMATION,
          reference: 'chart_failed',
          flex: 0.4,
          axes: [{
            type: 'numeric',
            fields: 'numFailed',
            position: 'left',
            minimum: 0,
            grid: true,
            title: 'R(t)'
          }, {
            type: 'numeric',
            fields: 'time',
            minimum: 0,
            position: 'bottom',
            grid: true,
            title: 't[s]'
          }],
          series: [{
            type: 'area',
            xField: 'time',
            yField: 'numFailed',
            style: {
              lineWidth: 0,
              fillStyle: '#ce3553',
              strokeStyle: '#ca3355',
              maxBarWidth: 20
            },
            highlight: {
              fillStyle: '#ca3355',
              lineWidth: 2,
              strokeStyle: '#000'
            },
            marker: {
              radius: 2,
              lineWidth: 4,
              strokeStyle: '#8B263F'
            },
            tooltip: {
              trackMouse: true,
              style: 'background: #fff',
              showDelay: 0,
              dismissDelay: 0,
              hideDelay: 0,
              renderer: function (rec, item) {
                var failedTasks = rec.get('failedTasks');
                var str = "";
                if (failedTasks.length) {
                  str = "<br/>Odrzucone: ";
                  for (var i = 0; i < failedTasks.length; i++) {
                    str += 't<sub>' + (failedTasks[i].getOrder() + 1) + '</sub> ';
                  }
                }
                this.setHtml(Ext.String.format('R({0})={1}', rec.get('time'), rec.get('numFailed')) + str);
              }
            }
          }]
        }
      ]
    }
  ]

});
//todo w tasku dać model nie t+ t- tylko an i zapomniec o t
//dodać range selector w html ktory nam pozwoli wykadrować fragment do wizualizacji dotychczasowej