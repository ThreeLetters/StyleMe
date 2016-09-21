var styleme = require('./styleme')
var extend = require('./stringProto')
var send = {};
  var list = JSON.parse(require('fs').readFileSync(__dirname + '/styles.json',"utf8"))
  var colors = {};
  var themes = {}
  var extended = false;
var functions = {
  style: function(a,b) {
    return styleme(a,b,colors,themes)
  },
  extend: function() {
    extended = true;
    return extend(send,colors,themes,special)
    
  },
  addTheme: function(theme) {
    if (typeof theme == "string") {
      theme = require(theme)
    }
    for (var i in theme) {
      themes[i] = theme[i];
    }
    
    update()
  },
  addAddOn: function(data) {
    if (typeof data == "string") {
      data = JSON.parse(fs.readFileSync(data))
    }
    for (var i = 0; i < data.length; i ++) {
      var a = data[i];
      if (!a.type || !a.name || !a.data) continue;
      switch (a.type) {
          case "theme":
          this.addTheme(a.data);
          break;
          case "special":
          this.addSpecial(a.name,a.data);
          break;
          case "style":
          this.addStyle(a.name,a.data)
          break;
      }
    }
  },
  addSpecial: function(name,func) {
    if (name.length > 3) throw "Code cannot be over 3 chars"
    if (typeof func == "string") {
      func = require(func);
    } else
    if (typeof func != "function") throw "Special patterns must be a function";
    special[name] = func;
    update()
  },
  addStyle: function(name,style) {
    if (name.length > 3) throw "Code cannot be over 3 chars"
    colors[name] = style
    update()
  },
}
var special = require('./special/')
update()
function update() {
  for (var i in list)
  {
    
    eval("colors." + i + " = \"" + list[i].replace(/\|/g,"\\") + "\"")
    
  }
for (var i in special) {
  var a = special[i].toString();
  var b = a.indexOf("(") + 1
  a = a.substring(b);
  var c = a.substring(0,a.indexOf(")")).split(",");
    c = c[2]
    
  if (c) {
  for (var k in colors) {
      if (a.indexOf(c + "." + k) == -1) continue;
a = a.replace(new RegExp(c + "\\." + k,"g"),"\"" + colors[k] + "\"");
  
  } 
  }
    var g = "function() {function cur(" + a +"var final = \"\";for (var i = 0; i < this.length; i ++) { final += cur(this.charAt(i),i);}return final + \"\x1b[0m\"}";
  eval("functions."+ i + "= function(a) {function cur(" + a +"var final = \"\";for (var i = 0; i < a.length; i ++) { final += cur(a.charAt(i),i);}return final + \"\x1b[0m\"}")
  send[i] = g
}
for (var i in themes) {
  var theme = themes[i];
  eval("functions." + i + "=function(a) {var th = \""+ theme +"\".split(\",\");for(var i = 0; i < th.length; i++) {var g = this[th[i]];if (g) a = g(a)}return a + \"\x1b[0m\"}")
}
for (var i in colors) {
  var h = colors[i];
    if (!h) continue;
  eval("functions." + i + "=function(a){return \"" + h +"\" + a + \"\x1b[0m\";}");
  
}
  if (extended) extend(send,colors,themes,special)
}

module.exports = functions
