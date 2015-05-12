var methods = require('./methods');
var Chain = require('./chain');
var utils = {};

Object.keys(methods).forEach(function(method) {
	utils[method] = function() {
		var chain = new Chain();
		var args = Array.prototype.slice.call(arguments);

		return chain[method].apply(chain, args);
	};
});

module.exports = utils;
