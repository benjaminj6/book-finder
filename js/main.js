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

  $('#search-book').submit(event => {
    event.preventDefault();
    
    let $search = $('#search-book input').val(); 
    let emptyBooksList = emptyElement('.books-list');

    if ($search.length > 3) {
      emptyBooksList;

      getSuggestions($search);
      moveHeader();

      $('#search-book input').val('');
    } else {
      emptyBooksList;
      createResultsHeading('Please enter a search term greater than 3 characters.');
    }

  });

  $('.books-list').on('click', '.see-more', () => {  
    hide('.dropdown');
    $('.see-more.hidden').removeClass('hidden');

    hide(this);
    $(this).siblings('.dropdown').removeClass('hidden');
  });

  $('.books-list').on('click', '.see-less', () => {
    hide('.dropdown');
    $(this).parents().siblings('.see-more').removeClass('hidden');
  });
});
