Ext.define('bo.view.generator.GeneratorController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.generator',
  listen: {
    controller: {
      'generator.summary': {
        summarychange: function (aStore, bStore, means) {
          console.log("means:", means);
          this.getView().down('#summaryLabel').setData(means);
        }
      }
    }
  },
  init: function () {
    this.getView().down('#openSessionButton').on('click', this.onOpenSession, this);
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
    var means = {
      a: rows.meanA,
      b: rows.meanB,
      needs: rows.meanNeeds
    };
    this.getView().down('#summary').getController().doSummary(aStore, bStore, means);
    this.currentRows = rows;
  },
  onOpenSession: function () {
    //todo otwieranie nowej sesji z tymi wygenerowanymi danymi
    var rows = this.currentRows;
    bo.app.mainController.addTab({
      xtype: 'app-tab',
      viewModel: {
        stores: {
          tasks: {
            data: rows
          }
        }
      }
    });
    this.closeView();
  }
});