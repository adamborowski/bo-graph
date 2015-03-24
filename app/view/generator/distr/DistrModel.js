Ext.define('bo.view.generator.distr.DistrModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.distr',
  data: {
    value: 'normal',
    params: {
      mu: 2,
      sigma: 0.5,
      alpha: 1.5,
      beta: 2,
      lambda: 1
    }
  },
  formulas: {
    useMu: function (get) {
      return get('value') == 'normal';
    },
    useSigma: function (get) {
      return get('value') == 'normal';
    },
    useAlpha: function (get) {
      return get('value') != 'normal' && get('value') != 'exponential';
    },
    useBeta: function (get) {
      return get('value') != 'normal' && get('value') != 'exponential';
    },
    useLambda: function (get) {
      return get('value') == 'exponential';
    }
  }
});