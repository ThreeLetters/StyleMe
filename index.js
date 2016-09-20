var styleme = require('./styleme')
var extend = require('./stringProto')
var a = {
  style: styleme,
  extend: extend,
}
var b = JSON.parse(require('fs').readFileSync(__dirname + "/styles.json"))

