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
console.log("This is normal red{this is red blu{this is blue}back to red bgr{green backround with red yel{blu bg with yellow text}Back to only green bk with red}red only again}normal again")
```
