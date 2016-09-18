var avail = JSON.parse(fs.readFileSync('./styles.json',"utf8"))
module.exports = function(str,style) {
  if (!style) throw "Style not specified";
  var styles = style.split(",")
  var final = "";
  styles.forEach((sty)=>{
    eval("var a = \"" + sty.replace(/\|/g,"\\") + "\"");
    final += a
    
  })
  final += str + "\x1b[0m"

return str


}
