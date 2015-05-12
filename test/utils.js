/* eslint-env mocha */
var utils = require('../lib/utils');

describe('utility function', function() {
	var valfn = function *() {
		return 'val';
	};

	it('calls generator with utils object', function *() {
		yield utils.left(function *() {
			arguments[0].must.be(utils);
		});
	});

	it('is chainable', function *() {
		(yield utils.bg('red').color('green', 'ABC')).must.be('%{Bred}%{Fgreen}ABC%{F}%{B}');
	});

	describe('left', function() {
		var fn = utils.left;

		it('prefixes with "l"', function *() {
			(yield fn('val')).must.be('%{l}val');
			(yield fn(valfn)).must.be('%{l}val');
		});
	});

	describe('center', function() {
		var fn = utils.center;

		it('prefixes with "c"', function *() {
			(yield fn('val')).must.be('%{c}val');
			(yield fn(valfn)).must.be('%{c}val');
		});
	});

	describe('right', function() {
		var fn = utils.right;

		it('prefixes with "r"', function *() {
			(yield fn('val')).must.be('%{r}val');
			(yield fn(valfn)).must.be('%{r}val');
		});
	});

	describe('color', function() {
		var fn = utils.color;

		it('assigns the color correctly', function *() {
			(yield fn('red', 'val')).must.be('%{Fred}val%{F}');
			(yield fn('red', valfn)).must.be('%{Fred}val%{F}');
		});
	});

	describe('bg', function() {
		var fn = utils.bg;

		it('assigns the background correctly', function *() {
			(yield fn('red', 'val')).must.be('%{Bred}val%{B}');
			(yield fn('red', valfn)).must.be('%{Bred}val%{B}');
		});
	});

	describe('button', function() {
		var fn = utils.button;

		it('assigns the button correctly', function *() {
			(yield fn('cmd', 'val')).must.be('%{A:cmd:}val%{A}');
			(yield fn('cmd', valfn)).must.be('%{A:cmd:}val%{A}');
		});
	});
});
