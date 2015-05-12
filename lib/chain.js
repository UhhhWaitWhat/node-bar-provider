var methods = require('./methods');

function Chain(cb) {
	this.chain = [];
	this.cb = cb;
}

Chain.prototype.append = function(fn, retriever) {
	var self = this;
	this.chain.unshift(fn);

	if(retriever) {
		if(this.cb) {
			return this.cb(function *() {
				return yield self.run(retriever);
			});
		} else {
			return this.run(retriever);
		}
	} else {
		return this;
	}
};

Chain.prototype.run = function *(retriever) {
	var start = typeof retriever === 'function' ? yield retriever(require('./utils')) : retriever;

	return this.chain.reduce(function(data, fn) {
		return fn(data);
	}, start);
};

Object.keys(methods).forEach(function(method) {
	Chain.prototype[method] = function(value, retriever) {
		if(!methods[method][0] || methods[method][0].indexOf('?') === -1) {
			retriever = value;
		}

		var prefix = methods[method][0] ? '%{' + methods[method][0].replace(/\?/g, value) + '}' : '';
		var postfix = methods[method][1] ? '%{' + methods[method][1] + '}' : '';

		return this.append(function(data) {
			return prefix + data + postfix;
		}, retriever);
	};
});

module.exports = Chain;
