module.exports = function(l,i,colors) {
  switch (i%5) {
    case 0:
    return "\x1b[31m" + l
    break;
    case 1:
      return "\x1b[33m" + l
    break;
    case 2:
      return "\x1b[32m" + l
    break;
    case 3:
      return "\x1b[34m" + l
    break;
    case 4:
      return "\x1b[35m" + l
    break;
  }
  
  
}
