var styleme = require('./styleme')

module.exports = {
  log: styleme,
  style: styleme,
  print: styleme,
  res: function(a) {return "\x1b[0m" + a},
  bri: function(a) {return "\x1b[1m" + a},
  dim: function(a) {return "\x1b[2m" + a},
  und: function(a) {return "\x1b[4m" + a},
  bli: function(a) {return "\x1b[5m" + a},
  rev: function(a) {return "\x1b[7m" + a},
  hid: function(a) {return "\x1b[8m" + a},
  bla: function(a) {return "\x1b[30m" + a},
  red: function(a) {return "\x1b[31m" + a},
  gre: function(a) {return "\x1b[32m" + a},
  yel: function(a) {return "\x1b[33m" + a},
  blu: function(a) {return "\x1b[34m" + a},
  mag: function(a) {return "\x1b[35m" + a},
  cya: function(a) {return "\x1b[36m" + a},
  whi: function(a) {return "\x1b[37m" + a},
  bbl: function(a) {return "\x1b[44m" + a},
  bre: function(a) {return "\x1b[41m" + a},
  bgr: function(a) {return "\x1b[42m" + a},
  bye: function(a) {return "\x1b[43m" + a},
  bma: function(a) {return "\x1b[45m" + a},
  bcy: function(a) {return "\x1b[46m" + a},
  bwh: function(a) {return "\x1b[47m" + a}
}
