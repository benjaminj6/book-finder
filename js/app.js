function getSuggestions(bookTitle) { //retrieves suggestions based of a book title
  var params = {
    q: bookTitle,
    type: "books",
    // info: 0,
    limit: 3,
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

    $.each(suggestionResults, function(index, item) {
      var book = getBookInfo(item.Name);
    })
  });
}

function getBookInfo(bookTitle) { //retrives data for a single book
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
  })
}

function createBookHTML(bookTitle) {
  var thisBookHTML = $('.template li').clone();

  //adds title
  thisBookHTML.find('a').attr('href', bookTitle.infoLink);

  thisBookHTML.find('a h3').text(bookTitle.title);
  //adds author
  //needs to search through the array of authors and return a list of the authors
  var authors = bookTitle.authors[0];
  thisBookHTML.find('.author').text(authors);

  //adds image
  var imgURL = bookTitle.imageLinks.thumbnail
  thisBookHTML.find('.thumbnail').attr('src', imgURL);

  //adds publication info

  thisBookHTML.find('.pub-info').text(bookTitle.publishedDate + ' by ' + bookTitle.publisher);

  //adds # of pages
  thisBookHTML.find('.pages').text(bookTitle.pageCount + ' pgs.');

  //adds description
  thisBookHTML.find('p').text(bookTitle.description);

  //appends the book to the list of suggestions
  $('.books-list').append(thisBookHTML);
}

function createResultsHeading(bookSearch) {
  //takes the query parameters and modifies the header to match
  $('.results-heading').html('Books similar to <em>' + bookSearch + '</em>:')
}

function moveHeader() {
	$('header').animate({margin: "0"}, 200, function() {
		$(this).css('position', 'fixed');
		console.log('position fixed');
	});
}
function hide(selector) {
  $(selector).not('.hidden').addClass('hidden')
}

/*----------------------------------------------------------------------*/
$(document).ready(function() {

  // user submits the form with either button or enter
  $('#search-book').submit(function(event) {
    event.preventDefault();

    //clears any previous search results
    $('.books-list').empty();
    
    //creates the suggestion list for a search query
    var search = $('#search-book input').val();
    getSuggestions(search);
    createResultsHeading(search);
    moveHeader();

    //clears out the text input for future searches
    $('#search-book input').val('');
  });

  //user clicks on 'See More'
  $('.books-list').on('click', '.see-more', function() {
    //resets currently shown items to collapsed
    hide('.dropdown');
    $('.see-more.hidden').removeClass('hidden');

    //hides see-more button and shows dropdown
    hide(this);
    $(this).siblings('.dropdown').removeClass('hidden');
  });

  //user clicks on 'See Less'
  $('.books-list').on('click', '.see-less', function() {
    //collapses the item and shows the see-more button again
    hide('.dropdown');
    $(this).parents().siblings('.see-more').removeClass('hidden');
  })
});
