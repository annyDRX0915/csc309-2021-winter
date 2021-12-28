/* 
 * This code is provided solely for the personal and private use of students 
 * taking the CSC309H course at the University of Toronto. Copying for purposes 
 * other than this use is expressly prohibited. All forms of distribution of 
 * this code, including but not limited to public repositories on GitHub, 
 * GitLab, Bitbucket, or any other online platform, whether as given or with 
 * any changes, are expressly prohibited. 
*/ 

/* E2 Library - JS */

/*-----------------------------------------------------------*/
/* Starter code - DO NOT edit the code below. */
/*-----------------------------------------------------------*/

// global counts
let numberOfBooks = 0; // total number of books
let numberOfPatrons = 0; // total number of patrons

// global arrays
const libraryBooks = [] // Array of books owned by the library (whether they are loaned or not)
const patrons = [] // Array of library patrons.

// Book 'class'
class Book {
	constructor(title, author, genre) {
		this.title = title;
		this.author = author;
		this.genre = genre;
		this.patron = null; // will be the patron objet

		// set book ID
		this.bookId = numberOfBooks;
		numberOfBooks++;
	}

	setLoanTime() {
		// Create a setTimeout that waits 3 seconds before indicating a book is overdue

		const self = this; // keep book in scope of anon function (why? the call-site for 'this' in the anon function is the DOM window)
		setTimeout(function() {
			
			console.log('overdue book!', self.title)
			changeToOverdue(self);

		}, 3000)

	}
}

// Patron constructor
const Patron = function(name) {
	this.name = name;
	this.cardNumber = numberOfPatrons;

	numberOfPatrons++;
}


// Adding these books does not change the DOM - we are simply setting up the 
// book and patron arrays as they appear initially in the DOM.
libraryBooks.push(new Book('Harry Potter', 'J.K. Rowling', 'Fantasy'));
libraryBooks.push(new Book('1984', 'G. Orwell', 'Dystopian Fiction'));
libraryBooks.push(new Book('A Brief History of Time', 'S. Hawking', 'Cosmology'));

patrons.push(new Patron('Jim John'))
patrons.push(new Patron('Kelly Jones'))

// Patron 0 loans book 0
libraryBooks[0].patron = patrons[0]
// Set the overdue timeout
libraryBooks[0].setLoanTime()  // check console to see a log after 3 seconds


/* Select all DOM form elements you'll need. */ 
const bookAddForm = document.querySelector('#bookAddForm');
const bookInfoForm = document.querySelector('#bookInfoForm');
const bookLoanForm = document.querySelector('#bookLoanForm');
const patronAddForm = document.querySelector('#patronAddForm');

/* bookTable element */
const bookTable = document.querySelector('#bookTable')
/* bookInfo element */
const bookInfo = document.querySelector('#bookInfo')
/* Full patrons entries element */
const patronEntries = document.querySelector('#patrons')

/* Event listeners for button submit and button click */

bookAddForm.addEventListener('submit', addNewBookToBookList);
bookLoanForm.addEventListener('submit', loanBookToPatron);
patronAddForm.addEventListener('submit', addNewPatron)
bookInfoForm.addEventListener('submit', getBookInfo);

/* Listen for click patron entries - will have to check if it is a return button in returnBookToLibrary */
patronEntries.addEventListener('click', returnBookToLibrary)

/*-----------------------------------------------------------*/
/* End of starter code - do *not* edit the code above. */
/*-----------------------------------------------------------*/


/** ADD your code to the functions below. DO NOT change the function signatures. **/


/*** Functions that don't edit DOM themselves, but can call DOM functions 
     Use the book and patron arrays appropriately in these functions.
 ***/

// Adds a new book to the global book list and calls addBookToLibraryTable()
function addNewBookToBookList(e) {
	e.preventDefault();

	// Add book book to global array
	const name = e.target.elements.newBookName.value;
	const author = e.target.elements.newBookAuthor.value;
	const genre = e.target.elements.newBookGenre.value;

	const book = new Book(name, author, genre);
	libraryBooks.push(book);


	// Call addBookToLibraryTable properly to add book to the DOM
	addBookToLibraryTable(book);
}

// Changes book patron information, and calls 
function loanBookToPatron(e) {
	e.preventDefault();

	// Get correct book and patron
	const bookId = e.target.elements.loanBookId.value;
	const cardNumber = e.target.elements.loanCardNum.value;
	const book = libraryBooks.filter(x => x.bookId == bookId)[0];
	const patron = patrons.filter(x => x.cardNumber == cardNumber)[0];
	if(book.patron != null){
		return;
	}


	// Add patron to the book's patron property
	book.patron = patron;
	

	// Add book to the patron's book table in the DOM by calling addBookToPatronLoans()
	addBookToPatronLoans(book);
	

	// Start the book loan timer.
	book.setLoanTime();

}

// Changes book patron information and calls returnBookToLibraryTable()
function returnBookToLibrary(e){
	e.preventDefault();
	// check if return button was clicked, otherwise do nothing.
	if(!e.target.classList.contains('return')){
		return;
	}
	const bookId = e.target.parentElement.parentElement.firstElementChild.innerHTML;
	const book = libraryBooks.filter(x => x.bookId == bookId)[0];

	// Call removeBookFromPatronTable()
	removeBookFromPatronTable(book);


	// Change the book object to have a patron of 'null'
	book.patron = null;


}

// Creates and adds a new patron
function addNewPatron(e) {
	e.preventDefault();

	// Add a new patron to global array
	const name = e.target.elements.newPatronName.value;
	const patron = new Patron(name);
	patrons.push(patron);


	// Call addNewPatronEntry() to add patron to the DOM
	addNewPatronEntry(patron);
}

// Gets book info and then displays
function getBookInfo(e) {
	e.preventDefault();

	// Get correct book
	const bookId = e.target.elements.bookInfoId.value;
	const book = libraryBooks.filter(x => x.bookId == bookId)[0];

	// Call displayBookInfo()	
	displayBookInfo(book);
}


/*-----------------------------------------------------------*/
/*** DOM functions below - use these to create and edit DOM objects ***/

// Adds a book to the library table.
function addBookToLibraryTable(book) {
	// Add code here
	const body = bookTable.getElementsByTagName('tbody')[0];
	body.insertRow(body.rows.length).innerHTML = `<tr>
			<td>${book.bookId}</td>
			<td><strong>${book.title}</strong></td>
			<td>${book.patron?.cardNumber ?? ''}</td>
		</tr>`;
}


// Displays deatiled info on the book in the Book Info Section
function displayBookInfo(book) {
	// Add code here
	bookInfo.innerHTML = `
	<p>Book Id: <span>${book.bookId}</span></p>
	<p>Title: <span>${book.title}</span></p>
	<p>Author: <span>${book.author}</span></p>
	<p>Genre: <span>${book.genre}</span></p>
	<p>Currently loaned out to: <span>${book.patron?.name ?? 'N/A'}</span></p>`;

}

// Adds a book to a patron's book list with a status of 'Within due date'. 
// (don't forget to add a 'return' button).
function addBookToPatronLoans(book) {
	// Add code here
	const bookParent = bookTable.querySelectorAll("tr");
	var bookBlock = null;
	for(var entry of bookParent.entries()){
		if(entry[1].firstElementChild.textContent == book.bookId){
			bookBlock = entry[1].lastElementChild;
		}
	}
	bookBlock.innerHTML = `${book.bookId}`;

	const block = [...patronEntries.getElementsByClassName('patron')].filter(
		x => x.getElementsByTagName('p')[1].getElementsByTagName('span')[0].textContent == book.patron.cardNumber)[0];
	const tbody = block.getElementsByTagName('tbody')[0];
	tbody.insertRow(tbody.rows.length).innerHTML = `
	<td>
		${book.bookId}
	</td>
	<td>
		<strong>${book.title}</strong>
	</td>
	<td>
		<span class='green'>Within due date</span>
	</td>
	<td>
		<button class='return'>return</button>
	</td>
	`;
}

// Adds a new patron with no books in their table to the DOM, including name, card number,
// and blank book list (with only the <th> headers: BookID, Title, Status, and Return).
function addNewPatronEntry(patron) {
	// Add code here
	patronEntries.innerHTML += `
	<div class='patron'>
	 		<p>Name: <span class='bold'>${patron.name}</span></p>
	 		<p>Card Number: <span class='bold'>${patron.cardNumber}</span></p>
	 		<h4>Books on loan:</h4>
	 		<table class='patronLoansTable'>
	 			<tbody>
			 		<tr>
			 			<th>
			 				BookID
			 			</th>
			 			<th>
			 				Title
			 			</th>
			 			<th>	
			 				Status
			 			</th>	
			 			<th>	
			 				Return
			 			</th>
			 		</tr>
		 		</tbody>
	 		</table>
	 	</div>
	`;
	
}


// Removes book from patron's book table and remove patron card number from library book table
function removeBookFromPatronTable(book) {
	// Add code here]
	const bookParent = bookTable.querySelectorAll("tr");
	var block = null;
	for(var entry of bookParent.entries()){
		if(entry[1].firstElementChild.textContent == book.bookId){
			block = entry[1].lastElementChild;
		}
	}
	block.innerHTML = "";
	//console.log(block)

	var patronBlock = [...patronEntries.getElementsByClassName('patron')].filter(
		x => x.getElementsByTagName('p')[1].getElementsByTagName('span')[0].textContent == book.patron.cardNumber)[0];
	patronBlock = patronBlock.getElementsByClassName("patronLoansTable")[0].querySelectorAll("tr");
	var block = null;
	for(var entry of patronBlock.entries()){
		if(entry[1].firstChild.nextElementSibling.textContent == book.bookId){
			block = entry[1];
		}
	}
	block.parentElement.removeChild(block);

}

// Set status to red 'Overdue' in the book's patron's book table.
function changeToOverdue(book) {
	// Add code here
	var patronBlock = [...patronEntries.getElementsByClassName('patron')].filter(
		x => x.getElementsByTagName('p')[1].getElementsByTagName('span')[0].textContent == book.patron.cardNumber)[0];
	patronBlock = patronBlock.getElementsByClassName("patronLoansTable")[0].querySelectorAll("tr")
	var block = null;
	for(var entry of patronBlock.entries()){
		if(entry[1].firstChild.nextElementSibling.textContent == book.bookId){
			// console.log(book.bookId)
			block = entry[1].firstChild.nextElementSibling.nextElementSibling.nextElementSibling;
		}
	}
	block.innerHTML = `<span class='red'>Overdue</span>`;

}

