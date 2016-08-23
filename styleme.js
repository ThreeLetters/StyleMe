var avail = JSON.parse(fs.readFileSync('./styles.json',"utf8"))
module.exports = function(str,style) {
  if (!style) throw "Style not specified";
  var styles = style.split("|")
  var final = "";
  styles.forEach((sty)=>{
    final += avail[sty]
    
  })
  final += str

return str


}
