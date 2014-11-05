bar-provider
============
[![Build Status](https://img.shields.io/travis/PaulAvery/node-bar-provider.svg?style=flat)](https://travis-ci.org/PaulAvery/node-bar-provider)

This module provides a way to easily define data to be piped into LemonBoy's [bar](https://github.com/LemonBoy/bar).

Quickstart
----------
*bar.js*

	var Bar = require('bar-provider');
	var bar = new Bar();

	bar
		.button('dmenu_run', 'Menu')
		.center(function *() {
			return new Date();
		})
		.interval(1000);

Now you can pipe it to bar

	node --harmony bar.js | bar


API
---
This module provides a chainable api to allow easy construction of a bar layout.
Whenever any data should be provided to a method, you may pass a string or a generator function returning a string. Any generator function will be run through [co](https://github.com/tj/co) and its return value will be rendered.

### Adding data

#### bar.append(<data>)
Identical to `bar.custom()` but only takes one argument

#### bar.left(<data>)
Prefixes with `%{l}`

#### bar.right(<data>)
Prefixes with `%{r}`

#### bar.center(<data>)
Prefixes with `%{c}`

#### bar.color(<color>, <data>)
Prefixes with `%{F<color>}` and postfixes with `%{F}`

#### bar.bg(<color>, <data>)
Prefixes with `%{B<color>}` and postfixes with `%{B}`

#### bar.button(<cmd>, <data>)
Prefixes `%{A:<cmd>:}` and postfixes with `%{A}`

#### bar.custom(<prefix>, <postfix>, <value>)
Construct your own entry. prefix and postfix can be omitted, but if supplied will be wrapped in `%{}` blocks.

### Rendering

#### bar.render()
Generator function which, when run through `co` outputs a single line on the console.

#### bar.interval(<ms>)
Normal function, which calls the render function at each interval.

Custom Styling
--------------
To allow styling of data returned from generator functions (think color for battery percentage), each generator function is passed a utility object, containing all the above methods. Simply return the result of a yielded method if neccessary.

	function *getBattery(utils) {
		//somehow get your battery percentage
		var percent = yield getPercentage();
		var color = percent > 50 ? 'green' : 'red';

		return yield utils.color(color, percent);
	}

	bar.right(getBattery);
