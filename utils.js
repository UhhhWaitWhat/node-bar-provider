var utils = {
	custom: format,
	left: fm('l'),
	center: fm('c'),
	right: fm('r'),
	color: multi('F?', 'F'),
	bg: multi('B?', 'B'),
	button: multi('A:?:', 'A')
};

function format(prefix, postfix, value) {
	if(arguments.length === 3) {
		prefix = '%{' + prefix + '}';
		postfix = '%{' + postfix + '}';
	} else if(arguments.length === 2) {
		prefix = '%{' + prefix + '}';
		value = postfix;
		postfix = '';
	} else if(arguments.length === 1){
		value = prefix;
		prefix = '';
		postfix = '';
	} else {
		value = '';
		prefix = '';
		postfix = '';
	}

	return function *() {
		var val = typeof value === 'function' ? (yield value(utils)) : value;
		return prefix + val + postfix;
	};
}

function multi(prefix, postfix) {
	return function(multi, value) {
		return format(prefix.replace('?', multi), (postfix || '').replace('?', multi), value || '');
	};
}

function fm(prefix, postfix) {
	return function(value) {
		if (arguments.length === 2) {
			return format(prefix, postfix, value || '');
		} else {
			return format(prefix, value || '');
		}
	};
}

module.exports = utils;
