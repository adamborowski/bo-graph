Ext.define('bo.generator.Config', {
  xtype: 'generator.config',
  extend: 'Ext.Panel',
  layout: 'anchor',
  defaults: {
    margin: '5 10'
  },
  getValue: function () {
    var seed = this.down('#seed').getValue();
    if (seed == null)seed = Math.floor(Math.random() * 100000000);
    return {
      population: this.down('#population').getValue(),
      aRandom: Ext.apply({seed: seed}, this.down('#aRandom').getValue()),
      bRandom: Ext.apply({seed: seed}, this.down('#bRandom').getValue())
    }
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
          itemId: 'population',
          value: 20000
        },
        {
          xtype: 'numberfield',
          emptyText: 'losowe',
          fieldLabel: 'ziarno',
          itemId: 'seed'
        }
      ]
    },
    {
      xtype: 'distr',
      title: 'interwał a<sub>n</sub>',
      itemId: 'aRandom'
    },
    {
      xtype: 'distr',
      title: 'rozmiar zgłoszenia b<sub>n</sub>',
      itemId: 'bRandom'
    }
  ]
});