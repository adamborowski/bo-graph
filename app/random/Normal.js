Ext.define('bo.random.Normal', {
  extend: 'bo.random.AbstractRandom',
  alias: 'random.normal',
  config: {
    mu: 1,
    sigma: 0
  },
  generateValue: function () {
    return this.stream.normal(this.mu, this.sigma);
  }
});