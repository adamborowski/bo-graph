Ext.define('bo.random.AbstractRandom', {
  $configPrefixed: false,
  config: {
    seed: null
  },
  constructor: function (config) {
    this.initConfig(config);
    this.callParent(arguments);
    this.stream = new Random(this.getSeed());
  },
  applySeed: function (val) {
    if (val == null)return Math.random();
    return val;
  }


});