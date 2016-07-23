//function that handles creating the html code to be added to the DOM

//function that handles getting the recommendations from the TasteKid API.
function getSuggestions(bookTitle) {
	var params = {
		q: bookTitle,
		type: "books",
		info: 1,
		limit: 10,
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
		console.log(results);
		var suggestionResults = results.Similar.Results; 

		$.each(suggestionResults, function(index, item) {
			// console.log("Item #" + (index + 1) + ": " + item.Name);
			getBookInfo(item.Name);
			//Code to generate the html list items
		});
	})
	.fail(function(jqXHR, error) {
	//code which displays the error 
	console.log(error);
	});
}

function createSuggestionHTML(book) {

}

// function that retrieves book data from OPEN LIBRARY for populating the list items.
/*function getBookInfo(bookTitle) {
	var params = {
		q: bookTitle,
	} 

	$.ajax({
		url: "//openlibrary.org/search.json?",
		data: params,
		dataType: "json"
	})
	.done(function(results) {
		console.log(results);	

		$.each(results.docs, function(index, item) {
			var thisTitle = item.title;
			
			if(thisTitle === bookTitle) {
				console.log(thisTitle);
				return false;
			}
		})
		//code to be executed goes here
	});
}*/

//function that handles getting the info for a single recommendation from the Google
//Books API
function getBookInfo(bookTitle) {
	var param = {
		q: bookTitle,
		key: "AIzaSyD6ur9ubG33m5ZcajPZVnS-ofqwg9wR4xs"
	};

	var googleURL = "https://www.googleapis.com/books/v1/volumes?";

	$.ajax({
		url: googleURL,
		data: param,
	})
	.done(function(results) {
		// console.log(results);
		
		$.each(results.items, function(index, item) {
			var thisBookInfo = item.volumeInfo;

			//returns info for ONLY the necessary bookTitle
			if (thisBookInfo.title.toLowerCase() === bookTitle.toLowerCase()) {
				console.log(thisBookInfo);
				return false;
			} 
		});
	})
	.fail(function(jqXHR, error) {
		console.log(error);
	});
}

/*----------------------------------------------------------------------*/
$(document).ready(function() {

	// user submits the form with either button or enter
	$('#search-book').submit(function(event) {
		event.preventDefault();	
		console.log('form submitted');
		// code here for functions that generate the list items
	});

	//user clicks on 'See More'
	$('.books-list').on('click', '.see-more', function() {
		console.log('see-more clicked');
		//code to generate additional info for clicked item
	});

/*---- TESTING GROUNDS ----*/	
	getSuggestions('dead souls');







});




