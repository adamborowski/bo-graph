Ext.define('bo.view.generator.distr.Distr', {
  extend: 'Ext.form.FieldSet',
  xtype: 'distr',
  viewModel: {
    type: 'distr'
  },
  getValue: function () {
    var data = this.getViewModel().data;
    return Ext.apply({
      type: data.value
    }, data.params);

  },
  defaults: bo.config.FormConfig.formDefaults,
  padding: '1 10 5 10',
  items: [
    {
      fieldLabel: 'typ rozkładu',
      xtype: 'combo',
      queryMode: 'local',
      displayField: 'label',
      valueField: 'value',
      store: {
        fields: ['label', 'value'],
        data: [
          ['Normalny', 'normal'],
          ['Gamma', 'gamma'],
          ['Wykładniczy', 'exponential'],
          ['Weibull', 'weibull']
        ]
      },
      editable: false,
      forceSelection: true,
      bind: '{value}'
    },
    {
      xtype: 'numberfield',
      fieldLabel: '&mu;',
      step: 0.1,
      bind: {
        value: '{params.mu}',
        hidden: '{!useMu}'
      }
    },
    {
      xtype: 'numberfield',
      fieldLabel: '&sigma;',
      step: 0.1,
      bind: {
        value: '{params.sigma}',
        hidden: '{!useSigma}'
      }
    },
    {
      xtype: 'numberfield',
      fieldLabel: '&alpha;',
      step: 0.1,
      bind: {
        value: '{params.alpha}',
        hidden: '{!useAlpha}'
      }
    },
    {
      xtype: 'numberfield',
      fieldLabel: '&beta;',
      step: 0.1,
      bind: {
        value: '{params.beta}',
        hidden: '{!useBeta}'
      }
    },
    {
      xtype: 'numberfield',
      fieldLabel: '&lambda;',
      step: 0.1,
      bind: {
        value: '{params.lambda}',
        hidden: '{!useLambda}'
      }
    }
  ]
});