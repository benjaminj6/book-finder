var $ = require('jquery');

function moveHeader() {
  $('header').animate({ margin: "0" }, 200, () => {
    $(this).css('position', 'fixed');
  });
}

module.exports = moveHeader;