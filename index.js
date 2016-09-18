var styleme = require('./styleme')

module.exports = {
  log: styleme,
  style: styleme,
  print: styleme,
  res: function() {return "\x1b[0m"},
  bri: function() {return "\x1b[1m"},
  dim: function() {return "\x1b[2m"},
  und: function() {return "\x1b[4m"},
  bli: function() {return "\x1b[5m"},
  rev: function() {return "\x1b[7m"},
  hid: function() {return "\x1b[8m"},
  bla: function() {return "\x1b[30m"},
  red: function() {return "\x1b[31m"},
  gre: function() {return "\x1b[32m"},
  yel: function() {return "\x1b[33m"},
  blu: function() {return "\x1b[34m"},
  mag: function() {return "\x1b[35m"},
  cya: function() {return "\x1b[36m"},
  whi: function() {return "\x1b[37m"},
  bbl: function() {return "\x1b[44m"},
  bre: function() {return "\x1b[41m"},
  bgr: function() {return "\x1b[42m"},
  bye: function() {return "\x1b[43m"},
  bma: function() {return "\x1b[45m"},
  bcy: function() {return "\x1b[46m"},
  bwh: function() {return "\x1b[47m"}
}
