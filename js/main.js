// listen for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save bookmark
function saveBookmark(e){
	
	var siteName = document.getElementById('siteName').value;
	var siteURL = document.getElementById('siteURL').value;

	var bookmark = {
		name: siteName,
		url: siteURL
	}

//test if bookmarks is null
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
// Prevent form from submitting
	e.preventDefault();
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
									 '</h3>' +
									 '</div>';
	}



}