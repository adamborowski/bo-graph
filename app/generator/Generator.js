Ext.define('bo.generator.Generator', {
  config: {
    population: 100,
    minA: 0.01,
    minB: 0.01,
    aRandom: 'normal',
    bRandom: 'normal',
    numBins: 20
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
    var minA = this.getMinA();
    var minB = this.getMinB();
    var ar = this.getARandom(), br = this.getBRandom();
    var data = [];
    var time = 0;
    var a, b;
    var sumA = 0, sumB = 0;
    for (var i = 0; i < numIter; i++) {
      a = ar.generateValue();
      b = br.generateValue();
      if (a < minA)a = minA;
      if (b < minB)b = minB;
      sumA += a;
      sumB += b;
      data.push({
        time: time,
        size: b,
        interval: a
      });
      time += a;
    }
    data.meanA = sumA / numIter;
    data.meanB = sumB / numIter;
    data.meanNeeds = data.meanB / data.meanA;
    return data;
  }
});