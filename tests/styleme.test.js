/* eslint-disable no-control-regex */
const StyleMe = require('../index.js')
const escape = require('./escape.js')

describe('Chaining properties/methods', () => {
  test('README examples', () => {
    expect(escape(StyleMe.red('a string'))).toBe('\\x1b[31ma string\\x1b[0m')
    expect(escape(StyleMe.red.bgBlue('another string'))).toBe('\\x1b[31m\\x1b[44manother string\\x1b[0m')
  })
  test('Special styles', () => {
    expect(escape(StyleMe.america('a string'))).toBe('\\x1b[31ma\\x1b[37m \\x1b[34ms\\x1b[31mt\\x1b[37mr\\x1b[34mi\\x1b[31mn\\x1b[37mg\\x1b[0m')
    expect(escape(StyleMe.blacknwhite('a string'))).toBe('\\x1b[47m\\x1b[30ma\\x1b[40m\\x1b[37m \\x1b[47m\\x1b[30ms\\x1b[40m\\x1b[37mt\\x1b[47m\\x1b[30mr\\x1b[40m\\x1b[37mi\\x1b[47m\\x1b[30mn\\x1b[40m\\x1b[37mg\\x1b[0m')
    expect(escape(StyleMe.rainbow('a string'))).toBe('\\x1b[31ma\\x1b[33m \\x1b[32ms\\x1b[34mt\\x1b[35mr\\x1b[31mi\\x1b[33mn\\x1b[32mg\\x1b[0m')
    expect(escape(StyleMe.random('a string'))).toBeDefined()
  })
})

describe('StyleMe method', () => {
  test('README examples', () => {
    expect(escape(StyleMe.styleMe('some text', 'red,bgBlue'))).toBe('\\x1b[31m\\x1b[44msome text\\x1b[0m')
    expect(escape(StyleMe.styleMe('same text', ['red', 'bgBlue']))).toBe('\\x1b[31m\\x1b[44msame text\\x1b[0m')
  })
  test('Special styles', () => {
    expect(escape(StyleMe.styleMe('a string', 'america'))).toBe('\\x1b[31ma\\x1b[37m \\x1b[34ms\\x1b[31mt\\x1b[37mr\\x1b[34mi\\x1b[31mn\\x1b[37mg\\x1b[0m')
    expect(escape(StyleMe.styleMe('a string', 'blacknwhite'))).toBe('\\x1b[47m\\x1b[30ma\\x1b[40m\\x1b[37m \\x1b[47m\\x1b[30ms\\x1b[40m\\x1b[37mt\\x1b[47m\\x1b[30mr\\x1b[40m\\x1b[37mi\\x1b[47m\\x1b[30mn\\x1b[40m\\x1b[37mg\\x1b[0m')
    expect(escape(StyleMe.styleMe('a string', 'rainbow'))).toBe('\\x1b[31ma\\x1b[33m \\x1b[32ms\\x1b[34mt\\x1b[35mr\\x1b[31mi\\x1b[33mn\\x1b[32mg\\x1b[0m')
    expect(escape(StyleMe.styleMe('a string', 'random'))).toBeDefined()
  })
  test('Invalid style', () => {
    expect(() => {
      StyleMe.styleMe('a string', 'invalud')
    }).toThrow('Style code')
  })
})

describe('Inline StyleMe method', () => {
  test('README examples', () => {
    expect(escape(StyleMe.styleMe('This is normal [red]{this is red [blue]{this is blue} back to red}'))).toBe('This is normal \\x1b[31mthis is red \\x1b[34mthis is blue\\x1b[0m\\x1b[31m back to red\\x1b[0m')
    expect(escape(StyleMe.styleMe('[blue,bgRed]{This is blue with a red background}'))).toBe('\\x1b[34m\\x1b[41mThis is blue with a red background\\x1b[0m')
  })
  test('Special styles', () => {
    expect(escape(StyleMe.styleMe('[america]{a string}'))).toBe('\\x1b[31ma\\x1b[37m \\x1b[34ms\\x1b[31mt\\x1b[37mr\\x1b[34mi\\x1b[31mn\\x1b[37mg\\x1b[0m')
    expect(escape(StyleMe.styleMe('[blacknwhite]{a string}'))).toBe('\\x1b[47m\\x1b[30ma\\x1b[40m\\x1b[37m \\x1b[47m\\x1b[30ms\\x1b[40m\\x1b[37mt\\x1b[47m\\x1b[30mr\\x1b[40m\\x1b[37mi\\x1b[47m\\x1b[30mn\\x1b[40m\\x1b[37mg\\x1b[0m')
    expect(escape(StyleMe.styleMe('[rainbow]{a string}'))).toBe('\\x1b[31ma\\x1b[33m \\x1b[32ms\\x1b[34mt\\x1b[35mr\\x1b[31mi\\x1b[33mn\\x1b[32mg\\x1b[0m')
    expect(escape(StyleMe.styleMe('[random]{a string}'))).toBeDefined()
  })

  test('Special + color styles', () => {
    expect(escape(StyleMe.styleMe('[america]{a st[bgWhite]{rin}g}'))).toBe('\\x1b[31ma\\x1b[37m \\x1b[34ms\\x1b[31mt\\x1b[47mrin\\x1b[0m\\x1b[37mg\\x1b[0m')
  })

  test('Missing closing brace', () => {
    const err = 'Missing a closing brace'
    expect(() => {
      escape(StyleMe.styleMe('This is normal [red]{this is red [blue]{this is blue} back to red'))
    }).toThrow(err)
    expect(() => {
      escape(StyleMe.styleMe('This is normal [red]{this is red [blue]{this is blue back to red}'))
    }).toThrow(err)
    expect(() => {
      escape(StyleMe.styleMe('This is normal [green]{[red]{this is red [blue]{this is blue} back to red}'))
    }).toThrow(err)
    expect(() => {
      escape(StyleMe.styleMe('This is [blue]{normal [red]{this is red [blue]{this is blue} back to red}'))
    }).toThrow(err)
  })
  test('Extra closing brace', () => {
    const err = 'Extra closing brace found at position'
    expect(() => {
      escape(StyleMe.styleMe('This is normal [red]{this is red [blue]{this is blue} back to red}}'))
    }).toThrow(err)
    expect(() => {
      escape(StyleMe.styleMe('This is normal [red]{this is red [blue]{this is blue}} back to red}'))
    }).toThrow(err)
    expect(() => {
      escape(StyleMe.styleMe('This is normal [red]{this is red [blue]this is blue} back to red}'))
    }).toThrow(err)
    expect(() => {
      escape(StyleMe.styleMe('This is normal [red]this is red [blue]{this is blue} back to red}'))
    }).toThrow(err)
  })
  test('Missing closing bracket', () => {
    const err = 'Closing square bracket not found!'
    expect(() => {
      escape(StyleMe.styleMe('This is normal [red{this is red [blue]{this is blue} back to red}'))
    }).toThrow(err)
  })
  test('Missing open bracket', () => {
    const err = 'Opening square bracket not found!'
    expect(() => {
      escape(StyleMe.styleMe('This is normal red]{this is red [blue]{this is blue} back to red}'))
    }).toThrow(err)
  })
  test('Switched open/closed bracket', () => {
    const err = 'Invalid brackets'
    expect(() => {
      escape(StyleMe.styleMe('This is normal ]red[{this is red [blue]{this is blue} back to red}'))
    }).toThrow(err)
  })
  test('Invalid code', () => {
    expect(() => {
      escape(StyleMe.styleMe('This is normal [invalid]{this is red [blue]{this is blue} back to red}'))
    }).toThrow('Style code')
  })
  test('Escape brace', () => {
    expect(escape(StyleMe.styleMe('[red]\\{styleless\\}'))).toBe('[red]{styleless}')
  })
  test('Escape Escape', () => {
    expect(escape(StyleMe.styleMe('[red]{styleless\\\\}'))).toBe('\\x1b[31mstyleless\\\\x1b[0m')
  })
  test('Whitespace between bracket and brace', () => {
    const err = 'Expected only whitespace at'
    expect(escape(StyleMe.styleMe('This is normal [red] {this is red [blue]\t {this is blue} back to red}'))).toBe('This is normal \\x1b[31mthis is red \\x1b[34mthis is blue\\x1b[0m\\x1b[31m back to red\\x1b[0m')

    expect(() => {
      escape(StyleMe.styleMe('This is normal [red] blah {this is red [blue]{this is blue} back to red}'))
    }).toThrow(err)
  })
})

describe('Adding styles', () => {
  test('Add string style', () => {
    StyleMe.addStyle('lol', '\x1b[5m')
  })
  test('Add function style', () => {
    StyleMe.addStyle('rednblue', (char, index, colors) => { // colors => a object where you can get colors without using ansi codes
      switch (index % 2) { // Red and blue inverse pattern
        case 0:
          return colors.bgBlue + colors.red + char
        case 1:
          return colors.bgRed + colors.blue + char
      }
    })
  })

  test('Add array style', () => {
    StyleMe.addStyle('testStyle', ['red', 'bgBlue', ['blacknwhite']])
    expect(escape(StyleMe.testStyle('test test'))).toBe('\\x1b[31m\\x1b[44m\\x1b[47m\\x1b[30mt\\x1b[40m\\x1b[37me\\x1b[47m\\x1b[30ms\\x1b[40m\\x1b[37mt\\x1b[47m\\x1b[30m \\x1b[40m\\x1b[37mt\\x1b[47m\\x1b[30me\\x1b[40m\\x1b[37ms\\x1b[47m\\x1b[30mt\\x1b[0m')
    expect(escape(StyleMe.styleMe('[testStyle]{test test}'))).toBe('\\x1b[31m\\x1b[44m\\x1b[47m\\x1b[30mt\\x1b[40m\\x1b[37me\\x1b[47m\\x1b[30ms\\x1b[40m\\x1b[37mt\\x1b[47m\\x1b[30m \\x1b[40m\\x1b[37mt\\x1b[47m\\x1b[30me\\x1b[40m\\x1b[37ms\\x1b[47m\\x1b[30mt\\x1b[0m')
  })

  test('Reject invalid array style', () => {
    expect(() => {
      StyleMe.addStyle('testStyleTwo', ['nonexistant'])
    }).toThrow('Style code')
  })

  test('Reject duplicate array style', () => {
    const err = 'Style with style code'
    expect(() => {
      StyleMe.addStyle('testStyleThree', 'test')
      StyleMe.addStyle('testStyleThree', 'test2')
    }).toThrow(err)
  })

  test('Reject empty or non-alphabetical codes', () => {
    const err = 'Style code must be an alphabetical string with no spaces'
    expect(() => {
      StyleMe.addStyle('4in2dhw20', '\x1b[3m')
    }).toThrow(err)
    expect(() => {
      StyleMe.addStyle('sdsdsd sdsidj', '\x1b[3m')
    }).toThrow(err)
    expect(() => {
      StyleMe.addStyle('', '\x1b[3m')
    }).toThrow(err)
  })
})

describe('String.prototype methods', () => {
  test('README examples', () => {
    StyleMe.extend()
    expect(escape('a string'.red())).toBe(escape(StyleMe.red('a string')))
    expect(escape('some text'.styleMe('red,bgBlue'))).toBe(escape(StyleMe.styleMe('some text', 'red,bgBlue')))
    expect(escape('This is normal [red]{this is red [blue]{this is blue} back to red}'.styleMe())).toBe(escape(StyleMe.styleMe('This is normal [red]{this is red [blue]{this is blue} back to red}')))
  })
  test('Add style with extend', () => {
    StyleMe.extend()
    StyleMe.addStyle('lolz', '\x1b[5m')
    expect(escape('a string'.lolz())).toBe('\\x1b[5ma string\\x1b[0m')
  })
})

describe('Themes', () => {
  test('setTheme README', () => {
    // Set the theme
    StyleMe.setTheme({
      rnb: ['red', 'bgBlue', function (char, ind, colors) {
        return ind.toString() + char
      }], // red and blue background
      ynr: ['yellow', 'bgMagenta'] // yellow and magenta background
    })

    // Can use it now!
    expect(escape(StyleMe.rnb('test'))).toBe('\\x1b[31m\\x1b[44m0t1e2s3t\\x1b[0m')
  })

  test('Invalid theme', () => {
    // Set the theme
    expect(() => {
      StyleMe.setTheme({
        inv: ['red', 'bgBlue', {}]
      })
    }).toThrow('Style must be a string code, a function, or an array')
  })
})
describe('other', () => {
  test('Undefined property access', () => {
    expect(StyleMe.undef).toBeUndefined()
  })
})
