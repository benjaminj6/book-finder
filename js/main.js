function emptyElement(element) {
  return $(element).empty();
}

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

function createResultsHeading(message) {
  $('.results-heading').html(message);
}

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

// TO DO : refactor when I find the time
function createBookHTML(bookTitle) {

  var $thisBookHTML = $('.template li').clone();

  var author = bookTitle.authors[0];
  var publishDate = bookTitle.publishedDate;
  var infoLink = bookTitle.infoLink; 
  var title = bookTitle.title;
  var description = bookTitle.description;
  var publisher =   validateInfo(bookTitle, 'publisher', bookTitle.publisher, 'Unknown Publisher');
  var pageCount = validateInfo(bookTitle, 'pageCount', bookTitle.pageCount + 'pgs.', 'Page Info Unavailable');

  // Special test for image availability
  if (!bookTitle.hasOwnProperty('imageLinks')) {
    var imageURL = 'assets/images/no-image.png';
  } else {
    var imageURL = bookTitle.imageLinks.thumbnail;
  }

  $thisBookHTML.find('a').attr('href', infoLink)
  $thisBookHTML.find('a h3').text(title);
  $thisBookHTML.find('.author').text(author);
  $thisBookHTML.find('.thumbnail').attr('src', imageURL);
  $thisBookHTML.find('.pub-info').text(publishDate + ' by ' + publisher);
  $thisBookHTML.find('.pages').text(pageCount);
  $thisBookHTML.find('p').text(description);

  $('.books-list').append($thisBookHTML);
}

function validateInfo(bookTitle, property, success, failure) {
  var value = '';   

  if(!bookTitle.hasOwnProperty(property)) {
    console.log(bookTitle.title + ' fail')
    value = failure;
  } else {
    console.log(bookTitle.title + ' success');
    value = success;
  }

return value;
}

function moveHeader() {
  $('header').animate({ margin: "0" }, 200, function() {
    $(this).css('position', 'fixed');
  });
}

function hide(selector) {
  $(selector).not('.hidden').addClass('hidden');
}

/*------------------------------------------------------------------------------------------------*/
$(document).ready(function() {

  $('#search-book').submit(function(event) {
    event.preventDefault();
    
    var $search = $('#search-book input').val(); 
    var emptyBooksList = emptyElement('.books-list');

    if ($search.length > 3) {
      emptyBooksList;
      $('.search-results').css('padding-top', '148px');

      getSuggestions($search);
      moveHeader();

      $('#search-book input').val('');
    } else {
      emptyBooksList;
      createResultsHeading('Please enter a search term greater than 3 characters.');
    }

  });

  $('.books-list').on('click', '.see-more', function() {  
    hide('.dropdown');
    $('.see-more.hidden').removeClass('hidden');

    hide(this);
    $(this).siblings('.dropdown').removeClass('hidden');
  });

  $('.books-list').on('click', '.see-less', function() {
    hide('.dropdown');
    $(this).parents().siblings('.see-more').removeClass('hidden');
  });
});
