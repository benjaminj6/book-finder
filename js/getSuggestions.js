var $ = require('jquery');
var emptyElement = require('./emptyElement');
var createResultsHeading = require('./createResultsHeading');
var getBookInfo = require('./getBookInfo');

function getSuggestions(bookTitle) {
  var params = {
    q: bookTitle,
    type: "books",
    limit: 5,
    k: "233177-bookfind-G83JWAJK",
    callback: "?"
  };

  $.ajax({
    url: "https://www.tastekid.com/api/similar?",
    data: params,
    dataType: "jsonp",
    type: "GET",
  })
  .done(function(results) {
    var suggestionResults = results.Similar.Results;

    if (suggestionResults.length > 0) {
      var successHeading = 'Books similar to <em>' + bookTitle + '</em>:';
      createResultsHeading(successHeading);
    } else {
      var errorHeading = 'Oops! No results were found for <em>' + bookTitle +
        '</em>. Please try another search.';
      createResultsHeading(errorHeading);
    }

    $.each(suggestionResults, function(index, item) {
      var book = getBookInfo(item.Name);
    });
  });
}

module.exports = getSuggestions;