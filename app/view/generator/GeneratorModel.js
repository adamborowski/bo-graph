Ext.define('bo.view.generator.GeneratorModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.generator',
  data: {
    currentRandom: 'normal',
    use: {
      alpha: false,
      beta: false,
      mu: false,
      sigma: false
    },
    value: {
      alpha: 1.5,
      beta: 1,
      mu: 2,
      sigma: 0.3
    }
  }
});