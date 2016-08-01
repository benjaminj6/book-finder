var $ = require('jquery');

function hide(selector) {
  $(selector).not('.hidden').addClass('hidden');
}

module.exports = hide;