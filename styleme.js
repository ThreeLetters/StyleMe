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
module.exports = function(str,style,colors,themes,special) {
  if (!style) throw "Style not specified";
  var styles = style.split(",")
  var final = "";
  styles.forEach((sty)=>{
   var b = "";
   if (colors[sty]) b = colors[sty];
   if (themes[sty]){
    var b = "";
    var c = themes[sty].split(",")
    for (var j = 0;j < c.length;j ++) {
     if (special[c[j]]) {
       var t = str;
     str = "";
     for (var i = 0; i < t.length; i ++) {
      str += special[sty](t.charAt(i),i);
      
     }
      continue;
     }
     b += colors[c[j]]
    }
    } else if (special[sty]) {
     var t = str;
     str = "";
     for (var i = 0; i < t.length; i ++) {
      str += special[sty](t.charAt(i),i);
      
     }
    }
    final += b
    
  })
  final += str + "\x1b[0m"

return final


}
