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
        createBookHTML(thisBookInfo);
        return false;
      }
    });
  });
}

function createBookHTML(bookTitle) {

  var $thisBookHTML = $('.template li').clone();

  var author = bookTitle.authors[0];
  var publishDate = bookTitle.publishedDate;
  var infoLink = bookTitle.infoLink; 
  var title = bookTitle.title;
  var description = bookTitle.description;

  // Tests whether Google Books API has information about the book
  if (!bookTitle.hasOwnProperty('imageLinks')) {
    var imageURL = 'assets/images/no-image.png';
  } else {
    var imageURL = bookTitle.imageLinks.thumbnail;
  }

  if(!bookTitle.hasOwnProperty('pageCount')) {
    var pageCount = 'Page Info Unavailable'
  } else {
    pageCount = bookTitle.pageCount + 'pgs';
  }

  if(!bookTitle.hasOwnProperty('publisher')) {
    var publisher = 'Unknown Publisher'
  } else {
    publisher = bookTitle.publisher;

  }

  //adds link
  $thisBookHTML.find('a').attr('href', infoLink)
  //adds title
  $thisBookHTML.find('a h3').text(title);
  //adds author
  $thisBookHTML.find('.author').text(author);

  //adds image
  console.log(bookTitle.imageLinks);
  $thisBookHTML.find('.thumbnail').attr('src', imageURL);

  //adds publication info
  $thisBookHTML.find('.pub-info').text(publishDate + ' by ' + publisher);

  //adds # of pages
  $thisBookHTML.find('.pages').text(pageCount);

  //adds description
  $thisBookHTML.find('p').text(description);

  //appends the book to the list of suggestions
  $('.books-list').append($thisBookHTML);
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

    if ($search.length > 3) {
      $('.books-list').empty();
      $('.search-results').css('padding-top', '148px');

      getSuggestions($search);
      moveHeader();

      $('#search-book input').val('');
    } else {
      $('.books-list').empty();

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
