/* eslint-disable no-extend-native */
const STYLES = require('../styles/Styles.js')
let IS_EXTENDED = false

/**
 * StyleMe
 *
 * Static class that is used to easily add colors to console outputs.
 */
class StyleMe {
  /**
   * Styles the given string according to the given style codes.
   * @param {String} str - String to style
   * @param {String|Array} styleCodes - Comma seperated list (or array) of style codes.
   * @returns {String} Styled output
   *
   * @throws Will throw error if an invalid style code is provided.
   */
  static style (str, styleCodes) {
    const output = []
    const styles = Array.isArray(styleCodes) ? styleCodes : styleCodes.split(',')
    const specials = []
    styles.forEach((styleCode) => {
      styleCode = styleCode.trim()
      if (Object.hasOwnProperty.call(STYLES, styleCode)) {
        const styleArray = Array.isArray(STYLES[styleCode]) ? STYLES[styleCode] : [STYLES[styleCode]]
        styleArray.forEach((style) => {
          switch (typeof style) {
            case 'function':
              specials.push(style)
              break
            case 'string':
              output.push(style)
          }
        })
      } else {
        throw Error(`Style code '${styleCode}' not found!`)
      }
    })
    if (specials.length !== 0) {
      for (let i = 0; i < str.length; i++) {
        let char = str.charAt(i)
        specials.forEach((styleFn) => {
          char = styleFn(char, i, STYLES)
        })
        output.push(char)
      }
    } else {
      output.push(str)
    }
    output.push('\x1b[0m')
    return output.join('')
  }

  /**
   * Styles a string with inline style markers
   * @param {String} str - String to style with inline style markers
   * @returns {String} Returns the styled string
   *
   * @throws Will give error if braces are mismatched.
   */
  static styleInline (str) {
    const codeStack = []
    const output = []

    let currentStyle = ''
    let outputIndex = 0
    const currentSpecials = []

    function updateCurrent () {
      currentSpecials.length = 0
      let top = 0
      const flattenedArray = []
      const styleStrings = []
      codeStack.forEach((styles) => {
        styles.forEach((style) => {
          const index = flattenedArray.indexOf(style)
          if (index !== -1) {
            flattenedArray.splice(index, 1)
          }
          flattenedArray.push(style)
        })
      })

      for (let i = flattenedArray.length - 1; i >= 0; i--) {
        if (typeof flattenedArray[i] !== 'function') {
          top = i
          break
        }
      }

      flattenedArray.forEach((style, i) => {
        if (typeof style === 'function') {
          if (i >= top) {
            currentSpecials.push(style)
          }
        } else {
          styleStrings.push(style)
        }
      })
      currentStyle = styleStrings.join('')
    }

    for (let i = 0; i < str.length; i++) {
      let char = str.charAt(i)
      let isEscaped = i !== 0 && str.charAt(i - 1) === '\\'
      const isOpening = char === '{'
      const isClosing = char === '}'
      if (isEscaped && (isOpening || isClosing)) {
        isEscaped = i < 2 || str.charAt(i - 2) !== '\\'
        output.pop()
        outputIndex--
      }

      if (!isEscaped && isOpening && i >= 3) {
        const bracketClose = str.lastIndexOf(']', i - 1)
        const bracketOpen = str.lastIndexOf('[', i - 1)
        if (bracketOpen === -1) {
          throw new Error(`Opening square bracket not found! Index: ${i}`)
        }

        if (bracketClose === -1) {
          throw new Error(`Closing square bracket not found! Index: ${i}`)
        }

        if (bracketClose <= bracketOpen) {
          throw new Error(`Invalid brackets at ${bracketOpen}-${bracketClose}`)
        }

        if (/\S/.test(str.substring(bracketClose + 1, i))) {
          throw new Error(`Expected only whitespace at ${bracketClose + 1} but found '${str.substring(bracketClose + 1, i)}'`)
        }

        const codes = str.substring(bracketOpen + 1, bracketClose).split(',').map(c => c.trim())
        const stylesArray = []
        codes.forEach((code) => {
          if (!Object.hasOwnProperty.call(STYLES, code)) {
            throw new Error(`Style code '${code}' not found! Index: ${i}`)
          }

          if (Array.isArray(STYLES[code])) {
            STYLES[code].forEach((style) => {
              stylesArray.push(style)
            })
          } else {
            stylesArray.push(STYLES[code])
          }
        })

        codeStack.push(stylesArray)
        output.length = output.length - (i - bracketOpen)
        outputIndex = outputIndex - (i - bracketOpen)
        char = stylesArray.filter(style => typeof style === 'string').join('')
        updateCurrent()
      } else if (!isEscaped && isClosing) {
        if (codeStack.length === 0) {
          throw new Error(`Extra closing brace found at position ${i}`)
        }

        codeStack.pop()
        updateCurrent()
        char = '\x1b[0m' + currentStyle
      } else {
        const index = outputIndex++
        currentSpecials.forEach((specialFn) => {
          char = specialFn(char, index, STYLES)
        })
      }

      output.push(char)
    }

    if (codeStack.length !== 0) {
      throw new Error('Missing a closing brace!')
    }
    return output.join('')
  }

  /**
   * Styles the given string according to the given style codes if given and uses inline style markers otherwise.
   * @param {String} str - String to style
   * @param {String|Array=} styleCodes - Optional comma seperated list (or array) of style codes.
   * @returns {String} - Styled output
   *
   * @throws Will throw error if an invalid style code is provided or if braces are mismatched.
   */
  static styleMe (str, styleCodes) {
    if (styleCodes !== undefined) {
      return this.style(str, styleCodes)
    } else {
      return this.styleInline(str)
    }
  }

  /**
   * Extends String.prototype with helper methods that can be used to easily style a string
   */
  static extend () {
    IS_EXTENDED = true

    for (const name in STYLES) {
      ((code) => {
        /**
         * Styles the string according to the method's code
         * @returns {String}
         */
        String.prototype[code] = function () {
          return StyleMe.style(this, code)
        }
      })(name)
    }

    /**
     * Styles the string according to the given style codes if given and uses inline style markers otherwise.
     * @param {String|Array=} styleCodes
     * @returns {String} Styled string
     *
     * @throws Will throw error if an invalid style code is provided or if braces are mismatched.
     */
    String.prototype.styleMe = function (styleCodes) {
      return StyleMe.styleMe(this, styleCodes)
    }
  }

  /**
   * Flattens an array style into a single array
   * @param {Array|String|Function} style
   * @param {Array=} arr
   * @returns {Array} Flattened array
   * @throws Error if style code not found or if invalid
   */
  static flattenStyle (style, arr) {
    if (arr === undefined) {
      arr = []
    }

    if (Array.isArray(style)) {
      style.forEach((styleCode) => {
        if (typeof styleCode === 'string') {
          if (!Object.hasOwnProperty.call(STYLES, styleCode)) {
            throw new Error(`Style code '${styleCode}' not found`)
          }
          this.flattenStyle(STYLES[styleCode], arr)
        } else if (typeof styleCode === 'function') {
          arr.push(styleCode)
        } else if (Array.isArray(styleCode)) {
          this.flattenStyle(styleCode, arr)
        } else {
          throw new Error('Style must be a string code, a function, or an array!')
        }
      })
    } else {
      arr.push(style)
    }
    return arr
  }

  /**
   * A function that adds styling to individual characters
   * @callback SpecialStyleFn
   * @param {char} char - Character involved
   * @param {number} index - Index of the character
   * @param {Object} styles - Object containing the styles as properties.
   * @returns Should return the styled character.
   */

  /**
   * Adds a style
   * @param {String} styleCode - style code string (alphabetical string, no spaces)
   * @param {String|SpecialStyleFn} style - Style string or function
   */
  static addStyle (styleCode, style) {
    if (styleCode.length === 0 || !/^[a-zA-Z]+$/.test(styleCode)) {
      throw Error('Style code must be an alphabetical string with no spaces')
    }

    if (Object.hasOwnProperty.call(STYLES, styleCode)) {
      throw Error(`Style with style code '${styleCode}' already exists!`)
    }

    STYLES[styleCode] = Array.isArray(style) ? this.flattenStyle(style) : style

    if (IS_EXTENDED) {
      /**
       * Styles the string according to the method's code
       * @returns {String}
       */
      String.prototype[styleCode] = function () {
        return StyleMe.style(this, styleCode)
      }
    }
  }

  /**
   * Sets a theme
   * @param {Object} theme
   */
  static setTheme (theme) {
    for (const styleCode in theme) {
      this.addStyle(styleCode, [theme[styleCode]])
    }
  }
}

/**
 * Wraps objects with a Proxy for code chaining
 * @param {Object} target
 * @param {Array} styles
 * @returns
 */
function recursiveProxy (target, styles) {
  if (styles === undefined) styles = []
  return new Proxy(target, {
    get: (target, prop, receiver) => {
      if (Object.hasOwnProperty.call(target, prop)) {
        return target[prop]
      }

      if (STYLES[prop] !== undefined) {
        const newstyle = styles.slice(0)
        newstyle.push(prop)
        return recursiveProxy((str) => {
          return StyleMe.style(str, newstyle)
        }, newstyle)
      }
    }
  })
}
const proxy = recursiveProxy(StyleMe)

module.exports = proxy
