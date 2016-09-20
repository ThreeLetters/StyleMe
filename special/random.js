module.exports = function(a,i,colors) {
var color = [
  colors.red,
  colors.gre,
  colors.blu,
  colors.yel,
  colors.mag,
  colors.whi,
  colors.cya
]
return color[Math.floor(Math.random() * 6)] + a

}
