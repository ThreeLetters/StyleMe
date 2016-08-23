var avail = JSON.parse(fs.readFileSync('./styles',"utf8"))
module.exports = function(str,style) {
  if (!style) throw "Style not specified";
  var styles = style.split("|")
  




}
