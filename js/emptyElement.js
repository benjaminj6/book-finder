var $ = require('jquery');

function emptyElement(element) {
	return $(element).empty();
}

module.exports = emptyElement;