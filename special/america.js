module.exports = function(a,i,colors) {
      switch(i % 3) {
          case 0:
              return colors.red + a;
              break;
          case 1:
              return colors.whi + a;
              break;
          case 2:
              return colors.blu + a;
              break;
              
      }
     
  }
