var $ = require('jquery');
var validateInfo = require('./validateInfo');

// TO DO : refactor when I find the time
function createBookHTML(bookTitle) {

  let $thisBookHTML = $('.template li').clone();

  let author = bookTitle.authors[0];
  let publishDate = bookTitle.publishedDate;
  let infoLink = bookTitle.infoLink; 
  let title = bookTitle.title;
  let description = bookTitle.description;
  let publisher =   validateInfo(bookTitle, 'publisher', bookTitle.publisher, 'Unknown Publisher');
  let pageCount = validateInfo(bookTitle, 'pageCount', `${bookTitle.pageCount}pgs.`, 'Page Info Unavailable');

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

var createMessage = (element, message) => element = message;


module.exports = createBookHTML;

