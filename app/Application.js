/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('bo.Application', {
  extend: 'Ext.app.Application',
  requires: [
    'bo.*',
    'Ext.chart.*'
  ],
  name: 'bo',

  stores: [
    "LocalStore"
    // TODO: add global / shared stores here
  ],

  launch: function () {
    Array.prototype.last = function () {
      return this[this.length - 1];
    }
  }
});
