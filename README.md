# StyleMe
Print to the console in style.


## Installation
> npm install styleme

## Usage

``var styleme = require('styleme')``


There are four methods to use this module


#### Method 1. The old way
```
console.log(styleme.red("a string"))
console.log(styleme.blu("another string"))
```

#### Method 2. The "Normal" way

```
console.log("Hello, this is yellow text".yellow()) // note that we dont use Object.__defineGetter__ which is deprecated unlike the popular colors module.
```

#### Method 3. The nifty way

```
console.log(styleme.style("some text","red,bbl")) // red text with blue backround
```

#### Method 4. The really cool way

```
console.log("This is normal red{this is red blu{this is blue} back to red}".styleMe())
```

### Color Codes
All of these methods use color codes. They have 3 letters.

|   Color   |Code|
|:----------|:--:|
|Reset      |res |
|Bright     |bri |
|Dim        |dim |
|Underline  |und |
|Blink      |bli |
|Reverse    |rev |
|Hide       |hid |
|Black      |bla |
|Red        |red |
|Green      |gre |
|Yellow     |yel |
|Blue       |blu |
|Magenta    |mag |
|Cyan       |cya |
|White      |whi |
|bgBlack    |bbl |
|bgRed      |bre |
|bgGreen    |bgr |
|bgYellow   |bye |
|bgMagenta  |bma |
|bgCyan     |bcy |
|bgWhite    |bwh |

