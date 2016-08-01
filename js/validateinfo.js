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

module.exports = validateInfo;

