var $ = require('jquery');
var emptyElement = require('./emptyElement');
var createResultsHeading = require('./createResultsHeading');
var getBookInfo = require('./getBookInfo');

function getSuggestions(bookTitle) {
  let params = {
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
  .done(results => {
    let suggestionResults = results.Similar.Results;

    if (suggestionResults.length > 0) {
      let successHeading = `Books similar to <em>${bookTitle}</em>:`;
      createResultsHeading(successHeading);
    } else {
      let errorHeading = `Oops! No results were found for <em> ${bookTitle} </em>. Please try another search.`;
      createResultsHeading(errorHeading);
    }

    // TO DO : put in a recursive function? At least play around with the idea.
    $.each(suggestionResults, function(index, item) {
      let book = getBookInfo(item.Name);
    });
  });
}

module.exports = getSuggestions;