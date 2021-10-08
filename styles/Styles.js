/**
 * The colors/styles defined. ASCII codes reference: https://gist.github.com/fnky/458719343aabd01cfb17a3a4f7296797
 *
 * Can be a string or function.
 */
module.exports = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underline: '\x1b[4m',
  strikethrough: '\x1b[5m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bgBlack: '\x1b[40m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgWhite: '\x1b[47m',
  clear: '\x1b[2J',
  america: require('./america.js'),
  rainbow: require('./rainbow.js'),
  random: require('./random.js'),
  blacknwhite: require('./blacknwhite.js')
}
