/* eslint-env mocha */
/* eslint-disable new-cap, no-underscore-dangle, no-loop-func */

var rewire = require('rewire');
var sinon = require('sinon');
var Bar = rewire('../lib/bar');
var Chain = require('../lib/chain');
var methods = require('../lib/methods');
var utils = require('../lib/utils');

describe('The Bar constructor', function() {
	it('can be used with "new"', function() {
		var bar = new Bar();
		bar.must.be.instanceof(Bar);
	});

	it('can be used without "new"', function() {
		var bar = Bar();
		bar.must.be.instanceof(Bar);
	});
});

describe('A bar instance', function() {
	var spy = sinon.spy();
	var revert = Bar.__set__('log', spy);
	var bar = new Bar();

	after(function() {
		revert();
	});

	afterEach(function() {
		spy.reset();
		bar = new Bar();
	});

	describe('has a render function which', function() {
		it('returns the instance', function *() {
			(yield bar.render()).must.be(bar);
		});

		it('outputs previously assigned data', function *() {
			bar.append('A');
			bar.append('B');
			yield bar.render();

			spy.calledWith('AB').must.be.true();
		});
	});

	describe('has a renderCo function which', function() {
		it('returns the instance', function *() {
			bar.renderCo().must.be(bar);
		});
	});

	describe('has an append function which', function() {
		it('returns the instance', function *() {
			bar.append('A').must.be(bar);
		});

		describe('queues the action in the correct order to render later', function() {
			it('for strings', function *() {
				bar
					.append('A')
					.append('B');

				yield bar.render();
				spy.calledWith('AB');
			});

			it('for generators', function *() {
				bar
					.append(function *() {return 'A'; })
					.append(function *() {return 'B'; });

				yield bar.render();
				spy.calledWith('AB');
			});
		});
	});

	describe('Utility functions', function () {
		for(var method in methods) {
			describe(method, function() {
				it('exists', function() {
					bar.must.have.property(method);
				});

				it('returns an instance of Chain', function() {
					bar[method]().must.be.an.instanceof(Chain);
				});

				it('attaches the correct function', function *() {
					bar[method]('a', 'b');
					yield bar.render();
					spy.calledWith(yield utils[method]('a', 'b')).must.be.true();
				});
			});
		}
	});
});
