# Microsass [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/bonarja/microsass/blob/master/LICENSE) [![NPM version](https://img.shields.io/npm/v/microsass.svg)](https://www.npmjs.com/package/microsass) 

Microsass is a script that can convert the basic structures of **SCSS** into **CSS** directly in the browser.

Microsass can process the staggered selectors of **SCSS**, y supports the declaration and use of basic variables, as well as the basic arithmetic processing of variables.

It also interprets the properties to add the -webkit, -moz-, -o and -ms required.

<br>

# Testing and live example

## [https://bonarja.github.io/microsass](https://bonarja.github.io/microsass) 🔨⛏


<br/>

# Support

Microsass supports sass staggered selectors, the use of & (self selector), @media screen, @keyframes and @font-face. 

Microsass allows to create variables using `$size1: 300px`; and basic arithmetic processes (addition, subtraction, multiplication and division)
```scss
.item{
    width: $size1 + $size2;
}
```
## NOTE Microsass still can not interpret @media screen inside another 🙁
<br/>

# USE

## Autoload

```html
<head>
    <title> Microsass </title>
    <link sass="./main.scss">
</head>
<body>
    <script src="./microsass.min.js"></script>
</body>
```

For multiple load you can separate with commas

```html
<link sass="
    ./main.scss,
    .style.scss
">
```

## Autoload by Promise

Load by javaScript

```html
<script src="./microsass.min.js"></script>
<script>
    microsass.import(["./main.scss", "./style.scss"]).then(() => {
        console.log("ready");
    });
</script>
```

<br>

# Conver SCSS text

Convert micro sass string to css minify string

```javascript
var scss = `
    $w1: 400px;
    $w2: 200px;
    #app {
        background: orange;
        .item{
            width: $w1 + $w2;
            p {
                color: white;
            }
        }
    }
`;
var css = microsass.convert(scss);
```
Convert micro sass string to css with format, html format and colors
```javascript
var scss = `
    $w1: 400px;
    $w2: 200px;
    #app {
        background: orange;
        .item{
            width: $w1 + $w2;
            p {
                color: white;
            }
        }
    }
`;
var css = microsass.convert(scss, {
    format: true, // default is false
    html: true, // default is false, format is auto-set true when html is true
    color: true // default is true, only works when html is true
});
```

<br>

# Conver by NPM module

`npm install microsass -save`

```js
const microsass = require('microsass');

var css = microsass.convert(scss, {
    format: true, // default is false
    html: true, // default is false, format is auto-set true when html is true
    color: true // default is true, only works when html is true
});
```

<br>

# Media abbreviation:

An abbreviation has been created for the media screen

Use:

```scss
@if x <= 400px {
    .item {
        width: 300px;
    }
}
```

Compiled output:

```css
@media screen and (max-width: 400px) {
    .item {
        width: 300px;
    }
}
```

Cases:

```
@if x >= xx  ---->  @media screen and (min-width xx)
@if x <= xx  ---->  @media screen and (max-width xx)
@if y >= xx  ---->  @media screen and (min-height xx)
@if y <= xx  ---->  @media screen and (max-height xx)
```
