var styleme = require('./styleme')
var extend = require('./stringProto')
var send = {};
var functions = {
  style: styleme,
  extend: function() {
    return extend(send)
    
  },
}
var special = require('./special/')
for (var i in special) {
  var a = special[i].toString();
  var b = a.indexOf("(") + 1
  a = a.substring(b);
  var c = a.substring(0,a.indexOf(")")).split(",");
    c = c[2]
    
  if (c) {
  for (var i in colors) {
      if (a.indexOf(c + "." + i) == -1) continue;
a = a.replace(new RegExp(c + "\\." + i,"g"),"\"" + colors[i] + "\"");
  }
      
  }
    var g = "function() {function cur(" + a +"var final = \"\";for (var i = 0; i < this.length; i ++) { final += cur(this.charAt(i),i);}return final + \"\x1b[0m\"}";
  eval("functions."+ i + "=" + g)
  send[i] = g
}
var b = JSON.parse(require('fs').readFileSync(__dirname + "/styles.json"))
for (var i in b) {
  var h = b[i];
    if (!h) continue;
  eval("functions." + i + "=function(){return \"" + h.replace(/\|/g,"\\") +"\" + this;}");
  
}

module.exports = functions
