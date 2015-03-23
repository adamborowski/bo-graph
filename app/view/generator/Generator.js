Ext.define('bo.view.generator.Generator', {
  xtype: 'generator',
  extend: 'Ext.window.Window',
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
      split: true,
      title: 'Ustawienia generatora',
      fbar: [
        '->',
        {
          text: 'Generuj strumień'
        }
      ]
    },
    {
      region: 'center',
      title: 'Wygenerowany strumień zgłoszeń',
      html: 'wykresy po generowaniu',
      fbar: [
        '->',
        {
          text: 'Twórz sesję'
        }
      ]
    }
  ]
});