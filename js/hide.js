var $ = require('jquery');

var hide = selector => $(selector).not('.hidden').addClass('hidden');

module.exports = hide;