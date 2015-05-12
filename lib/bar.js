var co = require('co');
var log = console.log.bind(console);
var Chain = require('./chain');
var methods = require('./methods');

function Bar() {
	if(!(this instanceof Bar)) return new Bar();
	this.chain = [];
}

Bar.prototype.append = function(fn) {
	this.chain.push(fn);
	return this;
};

Bar.prototype.interval = function(ms) {
	this.renderCo();
	setInterval(this.renderCo.bind(this), ms);
	return this;
};

Bar.prototype.render = function *() {
	var chain = yield this.chain;
	log(chain.join(''));

	return this;
};

Bar.prototype.renderCo = function() {
	co(this.render())();

	return this;
};

// Assign wrappers for all utility functions
Object.keys(methods).forEach(function(method) {
	Bar.prototype[method] = function() {
		var args = Array.prototype.slice.call(arguments);
		var chain = new Chain(this.append.bind(this));

		return chain[method].apply(chain, args);
	};
});

module.exports = Bar;
