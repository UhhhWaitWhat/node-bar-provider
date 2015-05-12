bar-provider
============
[![Build Status](https://img.shields.io/travis/PaulAvery/node-bar-provider.svg?style=flat)](https://travis-ci.org/PaulAvery/node-bar-provider)

This module provides a way to easily define data to be piped into LemonBoy's [bar](https://github.com/LemonBoy/bar). It depends on generators, so run node with the `--harmony` flag (or use io.js).

Quickstart
----------
*bar.js*

```js
var Bar = require('bar-provider');
var bar = new Bar();

bar
	.button('dmenu_run', 'Menu')
	.center(function *() {
		return new Date();
	})
	.interval(1000);
```

Now you can pipe it to bar

	$ node --harmony bar.js | bar


API
---
This module provides a chainable api to allow easy construction of a bar layout.
Whenever any data should be provided to a method, you may pass a string or a generator function returning a string. Any generator function will be run through [co](https://github.com/tj/co) and its return value will be rendered.

### Adding data

#### bar.raw(data)
Simply append raw text

#### bar.left(data)
Prefixes with `%{l}`

#### bar.right(data)
Prefixes with `%{r}`

#### bar.center(data)
Prefixes with `%{c}`

#### bar.color(color, data)
Prefixes with `%{F<color>}` and postfixes with `%{F}`

#### bar.bg(color, data)
Prefixes with `%{B<color>}` and postfixes with `%{B}`

#### bar.button(cmd, data)
Prefixes `%{A:<cmd>:}` and postfixes with `%{A}`

### Chaining
You may chain all the provided methods. If you omit the data argument, all the chained styles apply at once.
So the following will give you blue background AND white text:

```js
bar.bg('blue').color('white', 'Some Data');
```

while the following will print text on blue background followed by white text:

```js
bar.bg('blue', 'Some Data').color('white', 'Some more Data')
```

### Rendering

#### bar.render()
Generator function which, when run through `co` outputs a single line on the console.

#### bar.renderCo()
`bar.render()` wrapped via `co`. This returns immediately.

#### bar.interval(ms)
Normal function, which calls the render function at each interval.

Custom Styling
--------------
To allow styling of data returned from generator functions (think color for battery percentage), each generator function is passed a utility object, containing all the above methods. Simply return the result of a yielded method if neccessary. These may be chained as well

```js
function *getBattery(utils) {
	//somehow get your battery percentage
	var percent = yield getPercentage();
	var color = percent > 50 ? 'green' : 'red';

	return yield utils.color(color, percent);
}

bar.right(getBattery);
```
