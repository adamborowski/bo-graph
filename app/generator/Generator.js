Ext.define('bo.generator.Generator', {
  config: {
    population: 100,
    aRandom: 'normal',
    bRandom: 'normal',
    numBins:20
  },
  constructor: function (config) {
    this.initConfig(config);
    this.callParent(arguments);
  },
  _applyRandom: function (val) {
    if (val && val.isInstance)return val;
    if (Ext.isString(val))val = {type: val};
    return Ext.create('random.' + val.type, val);
  },
  applyARandom: function (val) {
    return this._applyRandom(val);
  },
  applyBRandom: function (val) {
    return this._applyRandom(val);
  },
  generate: function () {
    var numIter = this.getPopulation();
    var ar = this.getARandom(), br = this.getBRandom();
    var data = [];
    var time = 0;
    var a, b;
    for (var i = 0; i < numIter; i++) {
      a = ar.generateValue();
      b = br.generateValue();

      data.push({
        time: time,
        size: b,
        interval: a
      });
      time += a;
    }
    return data;
  }
});