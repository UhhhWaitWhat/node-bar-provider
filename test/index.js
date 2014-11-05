var rewire = require('rewire');
var sinon = require('sinon');
var _ = require('lodash');
var Bar = rewire('../index');
var utils = require('../utils');

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

	describe('Utility function', function () {
		_.forIn(utils, function(val, key) {
			describe('Utility function "' + key + '"', function() {
				it('exists', function() {
					bar.must.have.property(key);
				});

				it('returns the instance', function() {
					bar[key]().must.be(bar);
				});

				it('attaches the correct function', function *() {
					bar[key]('', '');
					yield bar.render();
					spy.calledWith(val('', ''));
				});
			});
		});
	});
});
