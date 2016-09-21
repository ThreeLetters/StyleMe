  /*
  Copyright 2016 Andrew S

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
   */
module.exports = function(spec,colors,themes) {

  
  var special = require('./special/')
  var curr = false;
  function checkSpecial(a) {
      if (!special[a]) return false;
      curr = special[a];
      return true;
  }
function check(a) {
    if (!colors[a]) return false
   var g = colors[a]
    return g;
}

for (var i in spec) {
eval("String.prototype." + i + " = " + spec[i])
}
for (var i in colors) {
  var a = colors[i];
    if (!a) continue;
  eval("String.prototype." + i + "=function(){return \"" + a +"\" + this;}");
  
}
for (var i in themes) {
  var theme = themes[i];
  eval("String.prototype." + i "=function() { var final = this;var th = \""+ theme +"\".split(\",\");for(var i = 0; i < th.length; i++) {var g = final[th[i]];if (g) final = g()}return final}")
}
String.prototype.end = function() {
  return this + "\x1b[0m";
}
String.prototype.styleMe = function() {
var t = 0;
    var k = []
    var o = 0;
    var thi = this;
    var result = "";
    var index = 0;
    for (var i = 0; i < 100; i ++) {
         var h = thi.indexOf("}",index) 
         var a = thi.charAt(i)
        if (curr && a != "}") {
        
           
            var g = curr(a,o,colors);
       
            o++;
            thi = thi.substring(0,i) + g + thi.substr(i+1);
            i += g.length - a.length
            continue;
        } else if (a == "}") {
            t--;
            curr = false;
            thi = thi.substring(0,i) + "\x1b[0m"+ thi.substr(i+1);
            continue;
        }
        
      var a = thi.indexOf("{",index);
      
       
       if ((h != -1 && h < a) || (a == -1 && h != -1)) {
       if (t == 0) throw "SYTAX ERROR";
       
           k.pop()
           var extra = k.join("")
       
           thi = thi.substring(0,h) + "\x1b[0m" + extra + thi.substring(h + 1);
          
           t--;
       } else if (a == -1) break;
        
        
     var c = thi.substring(a-3,a);
     var j = check(c);
        if (j) {
            thi = thi.substring(0,a-3) + j + thi.substring(a + 1)
            
        k[t] = j
        t++;
        } else if (checkSpecial(c)) {
            i = a - 4;
           
            o = 0;
              thi = thi.substring(0,a-3) + thi.substring(a + 1);
            
            t++;
        } else {
            index = a + 1;
        }
        
    }
    
    return thi + "\x1b[0m";
}
}
