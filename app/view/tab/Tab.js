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
      width: 420,
      split: true,
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
            markDirty: false,
            plugins: {
              ptype: 'gridviewdragdrop',
              dragText: 'Zmień kolejność zgłoszeń'
            }
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
              //menuDisabled: true
            },
            items: [
              {
                text: 'n',
                width: 52,
                hidden: true,
                renderer: function (val, meta, record, rowIdx) {
                  return rowIdx + 1;
                }
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
                dataIndex: 'interval',
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
                text: 't<sup>+</sup><sub>n</sub>',
                xtype: 'numbercolumn',
                flex: 1.3,
                dataIndex: 'enqueueTime',
                editor: false,
                tdCls: 'a-cell-readonly',
                emptyCellText: '-'
              },
              {
                text: 't*<sub>n</sub>',
                dataIndex: 'startTime',
                xtype: 'numbercolumn',
                flex: 1.3,
                editor: false,
                tdCls: 'a-cell-readonly',
                emptyCellText: '-'
              },
              {
                text: 't<sup>-</sup><sub>n</sub>',
                dataIndex: 'finishTime',
                xtype: 'numbercolumn',
                flex: 1.3,
                editor: false,
                tdCls: 'a-cell-readonly',
                emptyCellText: '-'
              },
              {
                text: 'd<sub>n</sub>',
                xtype: 'numbercolumn',
                flex: 1,
                dataIndex: 'systemDelay',
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
      ],
      fbar: [
        {
          xtype: 'label',
          html: 'status',
          itemId: 'status',
          flex: 1
        },
        {
          xtype: 'button',
          text: 'Symuluj',
          itemId: 'simBtn',
          tooltip: 'Ręczne uruchomienie symulacji <kbd>/</kbd> lub <kbd>~</kbd>',
          handler: 'doSimulationNow'
        }
      ]
    },
    {
      xtype: 'panel',
      itemId: 'loadingContainer',
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
          flex: 0.7,
          hidden: true//todo show it
        },
        {
          xtype: 'dygraph',
          reference: 'ut_dygraph',
          flex: 0.7,
          html: '<i class="a-gray a-start-info">rozpocznij symulację</i>',
          options: {
            labels: ['t[s]', 'U(t)'],
            ylabel: 'U(t)',
            xlabel: 't[s]',
            showRangeSelector: true,
            rangeSelectorHeight: 30,
            fillGraph: true,
            color: '#74ae0a',
            fillAlpha: 1,
            interactionModel: Dygraph.Interaction.defaultModel
          }
        },
        {
          xtype: 'dygraph',
          reference: 'nt_dygraph',
          flex: 1,
          options: {
            labels: ['t[s]', 'N(t)'],
            ylabel: 'N(t)',
            xlabel: 't[s]',
            showRangeSelector: true,
            rangeSelectorHeight: 30,
            fillGraph: true,
            fillAlpha: 1,
            color: '#3D4542',
            interactionModel: Dygraph.Interaction.defaultModel
          }
        },
        {
          xtype: 'dygraph',
          reference: 'rt_dygraph',
          flex: 1,
          options: {
            labels: ['t[s]', 'R(t)'],
            ylabel: 'R(t)',
            xlabel: 't[s]',
            showRangeSelector: true,
            rangeSelectorHeight: 30,
            fillGraph: true,
            fillAlpha: 1,
            color: '#a34152',
            interactionModel: Dygraph.Interaction.defaultModel
          }
        }
      ]
    }
  ]

});