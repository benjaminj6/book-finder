var $ = require('jquery');
var createBookHTML = require('./createBookHTML');

function getBookInfo(bookTitle) { 
  var param = {
    q: bookTitle,
    key: "AIzaSyD6ur9ubG33m5ZcajPZVnS-ofqwg9wR4xs",
  };

  var googleURL = "https://www.googleapis.com/books/v1/volumes?";

  $.ajax({
    url: googleURL,
    data: param,
  })
  .done(function(results) {
    $.each(results.items, function(index, item) {
      var thisBookInfo = item.volumeInfo;

      //returns info for ONLY the book title that matches the query
      if (thisBookInfo.title.toLowerCase() === bookTitle.toLowerCase()) {
        console.log(thisBookInfo);
        createBookHTML(thisBookInfo);
        return false;
      }
    });
  });
}

module.exports = getBookInfo;