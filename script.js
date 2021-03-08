







// class Book{
//     constructor(title, author, pages, readStatus){
//         this.title = title;
//         this.author = author;
//         this.pages = pages;
//         this.readStatus = readStatus;
//     }
// }


// class Library{

// }































// Old Content

let myLibrary = [];
const titleInput = document.querySelector('#titleInput');       //const for the user entered title
const authorInput = document.querySelector('#authorInput');     //const for the user entered Author
const pagesInput = document.querySelector('#pagesInput');       //const for the user entered number of pages
const readInput = document.querySelector('#readInput');         //const for the user input asking whether they read the book or not
const bookHolder = document.querySelector('#book-holder');      //container to hold the books




const submitButton = document.querySelector('#submitBook');     //submit button
submitButton.addEventListener('click', addNewBook);    

function addNewBook(){
    let newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, true);
    myLibrary.push(newBook);
    saveLocal();
    addAllToLibrary();
}


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function saveLocal(){
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function restoreLocal(){
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    if (myLibrary === null) myLibrary = [];
    myLibrary.forEach(addBookToLibrary);
}

function addAllToLibrary(){
    addBookToLibrary(myLibrary[myLibrary.length-1]);
    // myLibrary.forEach(addBookToLibrary);
}

function addBookToLibrary(obj){
    let container = document.createElement('article');      //Creates a container to hold the new book
    container.classList.add('book');                        //Adds the book class to the container for styling

    //p elements to hold each of the book properties
    let bookTitle = document.createElement('p');   
    let bookAuthor = document.createElement('p');
    let bookPages = document.createElement('p');
    let bookRead = document.createElement('p');

    //textContent for the p elements, used to display book data to the user.
    bookTitle.textContent = 'Title: ' + obj.title;
    bookAuthor.textContent = 'Author: ' + obj.author;
    bookPages.textContent ='Pages: ' + obj.pages;
    if (obj.read){
        bookRead.textContent = 'Read';
    }
    else{
        bookRead.textContent ='Not Read';
    }

    //append the article container to the bookHolder, and each of the p elements to the article/container
    bookHolder.appendChild(container);
    container.appendChild(bookTitle);
    container.appendChild(bookAuthor);
    container.appendChild(bookPages);
    container.appendChild(bookRead);

}



restoreLocal();