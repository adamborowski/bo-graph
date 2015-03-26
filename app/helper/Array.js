Ext.define('bo.helper.Array', {
  singleton: true,
  /**
   *
   * [{a:1,b:2}, {a:3,b:4}], ['b','a'] => [[1,2],[3,4]]
   * @param array
   * @param internalKeys
   */
  internalObjectToArray: function (array, internalKeys) {
    var arg = 'a';
    var ret = 'r';
    var argLength = 'l';

    var items = [];
    for (var i = 0; i < internalKeys.length; i++) {
      var internalKey = internalKeys[i];
      items.push(arg + '[i]' + '.' + internalKey);
    }
    var innerLoopBody = "[" + items.join(',') + "]";
    //console.log("innerLoopBody:", innerLoopBody);

    var body = "var {ret}=[]; var {argLength}={arg}.length; for(var i=0;i<{argLength};i++)\\{{ret}.push({innerLoopBody})\\} return {ret};";

    var code = new Ext.XTemplate(body).apply({ret: ret, arg: arg, argLength: argLength, innerLoopBody: innerLoopBody});
    //console.log("code:", code);
    var fn = new Function(arg, code);
    //console.log("fn:", fn);
    return fn(array);
  }
});