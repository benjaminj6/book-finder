var $ = require('jquery');

function moveHeader() {
  $('header').animate({ margin: "0" }, 200, function() {
    $(this).css('position', 'fixed');
  });
}

module.exports = moveHeader;