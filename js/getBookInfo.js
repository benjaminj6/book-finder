var $ = require('jquery');
var createBookHTML = require('./createBookHTML');

function getBookInfo(bookTitle) { 
  let params = {
    q: bookTitle,
    key: "AIzaSyD6ur9ubG33m5ZcajPZVnS-ofqwg9wR4xs",
  };

  let googleURL = "https://www.googleapis.com/books/v1/volumes?";

  $.ajax({
    url: googleURL,
    data: params,
  })
  .done(results => {
    // TO DO : use a recursive function on these? Play around with it.
    $.each(results.items, (index, item) => {
      let thisBookInfo = item.volumeInfo;

      //returns info for ONLY the book title that matches the query
      if (thisBookInfo.title.toLowerCase() === bookTitle.toLowerCase()) {
        createBookHTML(thisBookInfo);
        return false;
      }
    });
  });
}

module.exports = getBookInfo;