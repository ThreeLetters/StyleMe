module.exports = function(a,i) {
      switch(i % 3) {
          case 0:
              return "\x1b[31m" + a;
              break;
          case 1:
              return "\x1b[37m" + a;
              break;
          case 2:
              return "\x1b[34m" + a;
              break;
              
      }
     
  }
