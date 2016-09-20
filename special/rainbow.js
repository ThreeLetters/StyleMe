module.exports = function(l,i,colors) {
  switch (i%5) {
    case 0:
    return colors.red + l
    break;
    case 1:
      return colors.yel + l
    break;
    case 2:
      return colors.gre + l
    break;
    case 3:
      return colors.blu + l
    break;
    case 4:
      return colors.mag + l
    break;
  }
  
  
}
