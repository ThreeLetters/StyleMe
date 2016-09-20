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
var avail = JSON.parse(require('fs').readFileSync(__dirname + '/styles.json',"utf8"))
module.exports = function(str,style) {
  if (!style) throw "Style not specified";
  var styles = style.split(",")
  var final = "";
  styles.forEach((sty)=>{
    eval("var a = \"" + sty.replace(/\|/g,"\\") + "\"");
    final += a
    
  })
  final += str + "\x1b[0m"

return final


}
