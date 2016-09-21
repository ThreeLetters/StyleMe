
module.exports = function(char,index,colors) { // colors => a object where you can get colors without using ansi codes
switch(index%2) { // Black and white inverse pattern
 case 0:
 return colors.bwh + colors.bla + char;
 break;
 case 1:
 return colors.bbl + colors.whi + char
 break;
}
}
