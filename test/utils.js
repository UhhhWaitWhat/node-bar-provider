var utils = require('../utils');

describe('utility function', function() {
	var valfn = function *() {
		return 'val';
	};

	it('calls generator with utils object', function *() {
		yield utils.custom(function *() {
			arguments[0].must.be(utils);
		});
	});

	describe('custom', function() {
		var fn = utils.custom;

		it('handles 3 parameters', function *() {
			(yield fn('pre', 'post', 'val')).must.be('%{pre}val%{post}');
			(yield fn('pre', 'post', valfn)).must.be('%{pre}val%{post}');
		});

		it('handles 2 paramaters', function *() {
			(yield fn('pre', 'val')).must.be('%{pre}val');
			(yield fn('pre', valfn)).must.be('%{pre}val');
		});

		it('handles 1 paramater', function *() {
			(yield fn('val')).must.be('val');
			(yield fn(valfn)).must.be('val');
		});
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
