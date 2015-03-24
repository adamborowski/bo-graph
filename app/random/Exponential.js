Ext.define('bo.random.Exponential', {
  extend: 'bo.random.AbstractRandom',
  alias: 'random.exponential',
  config: {
    lambda: 1
  },
  generateValue: function () {
    return this.stream.exponential(this.lambda);
  }
});