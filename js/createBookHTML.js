var $ = require('jquery');
var validateInfo = require('./validateInfo');

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

module.exports = createBookHTML;

