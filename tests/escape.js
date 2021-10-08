
module.exports = function (string) {
  return string.split('').map((s) => {
    if (s === '\x1b') {
      return '\\x1b'
    }
    return s
  }).join('')
}
