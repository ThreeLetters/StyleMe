
[![NPM](https://img.shields.io/badge/Module-Npm-blue.svg)](https://www.npmjs.com/package/styleme)
[![Donate](https://img.shields.io/badge/Donate-Paypal-brightgreen.svg)](https://paypal.me/andrews54757)

![styleme](https://cloud.githubusercontent.com/assets/13282284/23569515/a4520fa2-002d-11e7-9a34-13cd1ddb5fc0.png)

Print to the console in style.


## Installation
> npm install styleme

## Usage

``var styleme = require('styleme')``


To use methods 2 and 4 also do


``styleme.extend()``


There are four methods to use this module


#### Method 1. The old way
```
console.log(styleme.red("a string"))
console.log(styleme.blu("another string"))
console.log(styleme.end());
```

#### Method 2. The "Normal" way

```
console.log("Hello, this is yellow text".yellow().end()) // note that we dont use Object.__defineGetter__ which is deprecated unlike the popular colors module. Also note putting a .end() at the end to reset
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


Special Codes


|Style      |Code|
|:----------|:--:|
|American   |ame |
|Rainbow    |rai |
|Random     |ran |
|BlackNWhite|bnw |
|Clearscreen|cle |



### Adding Colors

#### StyleMe.addStyle(code,style)
You can add your own colors using this function. Example: `StyleMe.addStyle("lol","\x1b[5m");`.

#### Styles.json

You can add your own colors and styles in styles.json. Remember to replace the "\\" with "|". 


### Adding Special Styles

#### StyleMe.addSpecial(code,function)
You can add your own special styles using this function. Example: 

```
StyleMe.addStyle("bnw",function(char,index,colors) { // colors => a object where you can get colors without using ansi codes
switch(index%2) { // Black and white inverse pattern
 case 0:
 return colors.bwh + colors.bla + char;
 break;
 case 1:
 return colors.bbl + colors.whi + char
 break;
}
});
```

Please note that you cannot use `colors[index]`. You must use `colors.colorcode` instead

#### /special/ folder
You can add your own special style by adding them in the /special folder. Remember to include it in special/index.js

```
module.exports = function(char,index,colors) { // colors => a object where you can get colors without using ansi codes
switch(index%2) { // Black and white inverse pattern
 case 0:
 return colors.bwh + colors.bla + char;
 break;
 case 1:
 return colors.bbl + colors.whi + char
 break;
}
}
```

Please note that you cannot use `colors[index]`. You must use `colors.colorcode` instead

### Adding Themes
Themes allow you to use multiple colors at the same time using one code.

> StyleMe.addTheme({
> rnb: "red,bbl", // red and blue backround
> })

Please note that themes do not work with String.styleMe().

### Adding add-ons
Add ons allow you to quickly add multiple themes/colors/special styles

```
StyleMe.addAddOn([
{
type: "style",
name: "bli", // blink
data: "\x1b[5"
},
{
type: "special",
name: "gny", // green and yellow
data: function(char,index,colors) {
switch(index%2) { // Green and Yellow inverse pattern
 case 0:
 return colors.gre + colors.yel + char;
 break;
 case 1:
 return colors.yel + colors.gre + char
 break;
}
}
}

])

```
