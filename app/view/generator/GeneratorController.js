Ext.define('bo.view.generator.GeneratorController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.generator',
  init: function () {

  },
  onGenerate: function () {
    var cfg = this.getView().down('#generatorConfig').getValue();
    var gen = Ext.create('bo.generator.Generator', cfg);
    var rows = gen.generate();
    var aDiscributor = new bo.helper.DiscreteDistributor({
      data: rows,
      dataField: 'interval',
      numBins: 30
    });
    var aBins = aDiscributor.generateBins();
    var aStore = new Ext.data.Store({
      fields: ['count', 'from', 'propability'],
      data: aBins
    });
    var bDiscributor = new bo.helper.DiscreteDistributor({
      data: rows,
      dataField: 'size',
      numBins: 30
    });
    var bBins = bDiscributor.generateBins();
    var bStore = new Ext.data.Store({
      fields: ['count', 'from', 'propability'],
      data: bBins
    });
    this.getView().down('#summary').getController().doSummary(aStore, bStore);
    this.currentRows = rows;
  },
  onOpenSession: function () {
    //todo otwieranie nowej sesji z tymi wygenerowanymi danymi
  }
});