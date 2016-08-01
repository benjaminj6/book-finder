var $ = require('jquery');
var emptyElement = require('./emptyElement');
var getSuggestions = require('./getSuggestions');
var createResultsHeading = require('./createResultsHeading');
var getBookInfo = require('./getBookInfo');
var createBookHTML = require('./createBookHTML');
var moveHeader = require('./moveHeader');
var hide = require('./hide');

/*------------------------------------------------------------------------------------------------*/
$(document).ready(function() {

console.log(getSuggestions);
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
