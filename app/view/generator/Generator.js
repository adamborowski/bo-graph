Ext.define('bo.view.generator.Generator', {
  xtype: 'generator',
  extend: 'Ext.window.Window',
  controller: {
    type: 'generator'
  },
  viewModel: {
    type: 'generator'
  },
  maximizable: true,
  layout: 'border',
  width: 1000,
  height: 700,
  title: 'Generator strumienia zgłoszeń',
  items: [
    {
      region: 'west',
      width: 230,
      xtype: 'generator.config',
      itemId: 'generatorConfig',
      split: true,
      title: 'Ustawienia generatora',
      fbar: [
        '->',
        {
          text: 'Generuj strumień',
          handler: 'onGenerate'
        }
      ]
    },
    {
      region: 'center',
      title: 'Wygenerowany strumień zgłoszeń',
      xtype: 'generator.summary',
      itemId: 'summary',
      fbar: [
        '->',
        {
          text: 'Twórz sesję',
          itemId: 'openSessionButton'
        }
      ]
    }
  ]
});