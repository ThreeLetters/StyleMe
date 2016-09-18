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
module.exports = function(list) {
function check(a) {
    if (!list[a]) return false
    
    eval("var g = \""  + list[a].replace(/\|/g,"\\") + "\"")
   
    return g;
}
for (var i in list) {
  var a = list[i];
    if (!a) continue;
  eval("String.prototype." + i + "=function(){return \"" + a.replace(/\|/g,"\\") +"\";}")
}
String.prototype.styleMe = function() {
var t = 0;
    var k = []
    var thi = this;
    var result = "";
    var index = 0;
    for (var i = 0; i < this.length; i ++) {
      var a = thi.indexOf("{",index);
       var h = thi.indexOf("}",index) 
       
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
        } else {
            index = a + 1;
        }
        
    }
    
    return thi + "\x1b[0m";
  }
}
