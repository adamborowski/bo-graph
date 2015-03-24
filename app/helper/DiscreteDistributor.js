Ext.define('bo.helper.DiscreteDistributor', {

  config: {
    numBins: 20,
    data: null,
    dataField: null
  },
  constructor: function (config) {
    this.initConfig(config);
    this.callParent(arguments);


  },
  generateBins: function () {
    var numBins = this.getNumBins();
    var bins = [];
    for (var i = 0; i < numBins; i++) {
      bins.push(0);
    }
    var data = this.getData();

    var dataLength = data.length;
    var dataField = this.getDataField();
    var value, max = -Infinity, min = Infinity;
    for (var i = 0; i < dataLength; i++) {
      value = data[i][dataField];
      if (value > max)max = value;
      if (value < min)min = value;
    }
    var width = max - min;
    var binWidth = width / (numBins - 1);
    var bin;
    for (var i = 0; i < dataLength; i++) {
      value = data[i][dataField];
      bin = Math.floor((value - min) / binWidth);
      bins[bin]++;
    }

    var ret = [];
    for (var i = 0; i < bins.length; i++) {
      var bin = bins[i];
      ret.push({
        from: i * binWidth + min,
        to: (i + 1) * binWidth + min,
        count: bin,
        propability: bin / dataLength
      })
    }

    return ret;
  }
});