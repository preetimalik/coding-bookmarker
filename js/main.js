// listen for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save bookmark
function saveBookmark(e){
	
	var siteName = document.getElementById('siteName').value;
	var siteURL = document.getElementById('siteURL').value;

	if(!validateForm(siteName, siteURL)){

		return false;
	}

	var bookmark = {
		name: siteName,
		url: siteURL
	}

// Test if bookmarks array is null
if(localStorage.getItem('bookmarks') === null){
	var bookmarks = [];
	bookmarks.push(bookmark);
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

else{
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	bookmarks.push(bookmark);
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

	// Clear form
	document.getElementById('myForm').reset();

	fetchBookmarks();

// Prevent form from submitting
	e.preventDefault();
}

// Delete bookmark

function deleteBookmark(url) {

	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	for(var i = 0; i < bookmarks.length; i++){

		if(bookmarks[i].url == url){

			// Remove bookmark from array 

			bookmarks.splice(i, 1);

		}
	}
		// Reset the local storage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	// Fetch bookmarks again

	fetchBookmarks();

}

function fetchBookmarks(){

	//Get bookmark from local storage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	//Get output id
	var bookmarkResults = document.getElementById('bookmarkResults');

	//Creating output
	bookmarkResults.innerHTML = '';

	for(var i = 0; i < bookmarks.length; i++){

		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarkResults.innerHTML += '<div class="well">' +
									 '<h3>'+ name +
									 '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
									 '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="'+url+'">Delete</a>'+
									 '</h3>' +
									 '</div>';
	}



}



// Validate Form


function validateForm(siteName, siteURL){


	if(!siteName || !siteURL){

		alert('Please fill in the form before saving!');
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteURL.match(regex)){

		alert('Please use a valid URL!');
		return false;
	}

	return true;
}