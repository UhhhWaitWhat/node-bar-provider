var utils = require('./utils');
var co = require('co');
var _ = require('lodash');
var log = console.log.bind(console);

function Bar() {
	if(!(this instanceof Bar)) return new Bar();

	this._chain = [];
}

Bar.prototype.append = function(fn) {
	this._chain.push(fn);
	return this;
};

Bar.prototype.interval = function(ms) {
	this.renderCo();
	setInterval(this.renderCo.bind(this), ms);
	return this;
};

Bar.prototype.render = function *() {
	var chain = yield this._chain;
	log(chain.join(''));

	return this;
};

Bar.prototype.renderCo = function() {
	co(this.render())();

	return this;
};

// Assign wrappers for all utility functions
_.forIn(utils, function(val, key) {
	Bar.prototype[key] = function() {
		this.append(val.apply(null, _.toArray(arguments)));
		return this;
	};
});

module.exports = Bar;
