Ext.define('bo.view.corevis.CoreVis', {
  extend: 'Ext.panel.Panel',
  xtype: 'corevis',
  controller: {
    type: 'corevis'
  },
  layout: 'fit',
  items: {
    xtype: 'draw',
    reference: 'draw',
    style:'border: 1x solid red'
  }
});