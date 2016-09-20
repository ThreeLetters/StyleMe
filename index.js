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
var colors = JSON.parse(require('fs').readFileSync(__dirname + "/styles.json"))
for (var i in special) {
  var a = special[i].toString();
  var b = a.indexOf("(") + 1
  a = a.substring(b);
  var c = a.substring(0,a.indexOf(")")).split(",");
    c = c[2]
    
  if (c) {
  for (var k in colors) {
      if (a.indexOf(c + "." + k) == -1) continue;
a = a.replace(new RegExp(c + "\\." + k,"g"),"\"" + colors[k].replace(/\|/g,"\\") + "\"");
  
  } 
  }
    var g = "function(a) {function cur(" + a +"var final = \"\";for (var i = 0; i < a.length; i ++) { final += cur(a.charAt(i),i);}return final + \"\x1b[0m\"}";
  eval("functions."+ i + "=" + g)
  send[i] = g
}
var b = colors
for (var i in b) {
  var h = b[i];
    if (!h) continue;
  eval("functions." + i + "=function(a){return \"" + h.replace(/\|/g,"\\") +"\" + a;}");
  
}

module.exports = functions
