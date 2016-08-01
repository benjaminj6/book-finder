var $ = require('jquery');

function createResultsHeading(message) {
  $('.results-heading').html(message);
}

module.exports = createResultsHeading;