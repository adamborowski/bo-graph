Ext.define('bo.view.generator.Generator', {
  xtype: 'generator',
  cls: 'a-generator',
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
        {
          itemId: 'summaryLabel',
          xtype: 'label',
          tpl: "<span class=\"span-box-a\">a<sub>śr</sub> = {a:number(\'#.###\')}</span>\n<span class=\"span-box-b\">b<sub>śr</sub> = {b:number(\'#.###\')}</span>\n<span class=\"span-box-needs\">z<sub>śr</sub> = {needs:number(\'#.###\')}</span>"
        },
        '->',
        {
          text: 'Twórz sesję',
          itemId: 'openSessionButton'
        }
      ]
    }
  ]
});