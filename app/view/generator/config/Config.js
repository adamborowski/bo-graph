Ext.define('bo.generator.Config', {
  xtype: 'generator.config',
  extend: 'Ext.Panel',
  layout: 'anchor',
  defaults: {
    margin: '5 10'
  },
  items: [
    {
      xtype: 'fieldset',
      title: 'ogólne',
      defaults: bo.config.FormConfig.formDefaults,
      items: [
        {
          xtype: 'numberfield',
          minValue: 1,
          fieldLabel: 'populacja',
          value: 20000
        },
        {
          xtype: 'numberfield',
          emptyText: 'losowe',
          fieldLabel: 'ziarno'
        }
      ]
    },
    {
      xtype: 'distr',
      title: 'interwał a<sub>n</sub>'
    },
    {
      xtype: 'distr',
      title: 'rozmiar zgłoszenia b<sub>n</sub>'
    }
  ]
});