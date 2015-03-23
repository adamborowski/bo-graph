Ext.define('bo.random.Gamma', {
  extend: 'bo.random.AbstractRandom',
  alias: 'random.gamma',
  config: {
    alpha: 1,
    beta: 0
  },
  generateValue: function () {
    return this.stream.gamma(this.alpha, this.beta);
  }
});