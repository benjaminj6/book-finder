//function that handles creating the html code to be added to the DOM

//function that handles getting the recommendations from the TasteKid API.
function getRecommendations(bookTitle) {
	var params = {
		q: bookTitle,
		type: "books",
		info: 1,
		k: "233177-bookfind-G83JWAJK",
		callback: "?"
	}

	$.ajax({
		url: "https://www.tastekid.com/api/similar?",
		data: params,
		dataType: "jsonp",
		type: "GET"
	})
	.done(function(jsonp) {
		console.log(jsonp);
	})
	.fail(function(jsonp) {
		//code which displays the error message
	})
}
//function that handles getting the info for each recommendation from the Google
//Books API


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
	});

	getRecommendations('war and peace');
})