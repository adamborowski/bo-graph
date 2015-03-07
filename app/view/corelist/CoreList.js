Ext.define("bo.view.corelist.CoreList", {
  extend: "Ext.grid.Panel",
  xtype: 'corelist',
  controller: "corelist",
  viewModel: {
    type: "corelist"
  },
  title: 'ustawienia',
  collapsible: true,
  collapsed: false,
  collapseFirst: false,
  bind: {
    store: '{cores}'
  },
  selModel: {
    mode: 'MULTI'
  },
  viewConfig: {
    markDirty: false
  },
  dockedItems: [
    {
      xtype: 'toolbar',
      ui: 'footer',
      dock: 'top',
      layout: 'anchor',
      defaults: {
        anchor: '100% 100%',
        labelAlign: 'right',
        margin: '0 5 5 0'
      },
      items: [
        {
          xtype: 'numberfield',
          minValue: 0,
          fieldLabel: 'Q <small>(0 = &infin;)</small>',
          bind: '{queueSize}'
        },
        {
          xtype: 'numberfield',
          minValue: 0,
          fieldLabel: '&Delta; <small>(0 = &infin;)</small>',
          bind: '{delta}',
          margin: '0 5 0 0'
        }
      ]
    }
  ],
  tools: [
    {
      tooltip: 'dodaj rdzeń',
      type: 'plus',
      handler: 'addRow'
    },
    {
      tooltip: 'usuń zaznaczone',
      type: 'minus',
      handler: 'removeRow'
    }
  ],
  plugins: {
    ptype: 'cellediting',
    clicksToEdit: 1
  },
  columns: [
    {
      xtype: 'rownumberer'
    },
    {
      dataIndex: 'performance',
      text: 'v<sub>n</sub>',
      flex: 1,
      editor: {
        xtype: 'numberfield',
        minValue: 1
      }
    },
    //{
    //  dataIndex: 'partSize',
    //  text: '&Delta;',
    //  flex: 1,
    //  editor: {
    //    xtype: 'numberfield',
    //    minValue: 0
    //  },
    //  renderer: function (a) {
    //    if (a == 0) {
    //      return '&infin;'
    //    }
    //    return a;
    //  }
    //}
  ]
});
