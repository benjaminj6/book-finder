//function that handles creating the html code to be added to the DOM

//function that handles getting the recommendations from the TasteKid API.
function getSuggestions(bookTitle) {
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
		// console.log(results);
		var suggestionResults = results.Similar.Results; 

		$.each(suggestionResults, function(index, item) {
			// console.log("Item #" + (index + 1) + ": " + item.Name);
			//Code to generate the html list items
			// console.log(item);
			var book = getBookInfo(item.Name);
			// console.log(gBooks);
			// createBookHTML(gBooks, item);
			// console.log(item.wTeaser)
		})
	});
}

//function that handles getting the info for a single recommendation from the Google
//Books API
function getBookInfo(bookTitle) {
	var param = {
		q: bookTitle,
		key: "AIzaSyD6ur9ubG33m5ZcajPZVnS-ofqwg9wR4xs", 
		// fields:"items(volumeInfo)"
	};

	var googleURL = "https://www.googleapis.com/books/v1/volumes?";

	$.ajax({
		url: googleURL,
		data: param,
	})
	.done(function(results) {
		console.log(results);
		$.each(results.items, function(index, item) {
			var thisBookInfo = item.volumeInfo;

			//returns info for ONLY the necessary bookTitle
			if (thisBookInfo.title.toLowerCase() === bookTitle.toLowerCase()) {
				console.log(thisBookInfo);
				createBookHTML(thisBookInfo);
				return false;
			}
		});
		
	})
	.fail(function(jqXHR, error) {});
}


function createResultsHeader(bookSearch) {
	//takes the query parameters and modifies the header to match
}

function createBookHTML(bookTitle) {
	var thisBookHTML = $('.template li').clone();

	//adds title
	thisBookHTML.find('h3 a').text(bookTitle.title);

	//adds author
	//needs to search through the array of authors and return a list of the authors
	var authors = bookTitle.authors.toString()
	thisBookHTML.find('.author').text(authors);

	//adds image
	var imgURL = bookTitle.imageLinks.thumbnail
	thisBookHTML.find('.thumbnail').attr('src', imgURL );

	//adds publication info

	thisBookHTML.find('.pub-info').text(bookTitle.publishedDate + ' by ' + bookTitle.publisher);

	//adds # of pages
	thisBookHTML.find('.pages').text(bookTitle.pageCount + 'pgs.');

	//adds description
	thisBookHTML.find('p').text(bookTitle.description);
	
	//appends the book to the list of suggestions
	$('.books-list').append(thisBookHTML);
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
		//resets currently shown items to collapsed
		hide('.dropdown');
		$('.see-more.hidden').removeClass('hidden');

		//hide button and show dropdown
		hide(this);
		$(this).siblings('.dropdown').removeClass('hidden');
	});

	//user clicks on 'See Less'
	$('.books-list').on('click', '.see-less', function() {
		hide('.dropdown');
		$(this).parents().siblings('.see-more').removeClass('hidden');
	})

	function hide(selector) {
		$(selector).not('.hidden').addClass('hidden')
	}
/*---- TESTING GROUNDS ----*/	
	getSuggestions('lord of the rings');
	// getBookInfo('Love in the time of cholera');






});




