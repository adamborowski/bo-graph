Ext.define('bo.store.LocalStore', {
  extend: 'Ext.data.Store',
  requires: [],
  statics: {},
  fields: ['key', 'value'],
  autoSync: true,
  autoLoad: true,
  proxy: {
    type: 'localstorage',
    id: 'app-settings'
  }
});