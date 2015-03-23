Ext.define('bo.random.Weibull', {
  extend: 'bo.random.AbstractRandom',
  alias: 'random.weibull',
  config: {
    alpha: 1,
    beta: 0
  },
  generateValue: function () {
    return this.stream.weibull(this.alpha, this.beta);
  }
});