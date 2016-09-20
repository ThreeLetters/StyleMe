var styleme = require('./styleme')
var extend = require('./stringProto')
var a = {
  style: styleme,
  extend: extend,
}
var b = JSON.parse(require('fs').readFileSync(__dirname + "/styles.json"))
for (var i in b) {
  var h = b[i];
    if (!h) continue;
  eval("a." + i + "=function(){return \"" + h.replace(/\|/g,"\\") +"\" + this;}");
  
}

