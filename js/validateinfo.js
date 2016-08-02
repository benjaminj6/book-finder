function validateInfo(bookTitle, property, success, failure) {
  var value = '';   

  if(!bookTitle.hasOwnProperty(property)) {
    value = failure;
  } else {
    value = success;
  }

return value;
}

module.exports = validateInfo;

