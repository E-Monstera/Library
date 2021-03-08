




class Book {
    constructor(title, author, pages, readStatus) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
    }
}


class Library {
    myLibrary;
    constructor() {
        this.myLibrary = [{ title: "title1", author: "author1", pages: 123, readStatus: true }];
 
    }

    addBook = () => {
        let read;
        if (readInput.checked) {
            read = true;
        }
        else {
            read = false;
        }
        let newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, read);

        this.myLibrary.push(newBook);
        this.saveData();
    }

    // Loops through the myLibrary array (from readData()) and creates each container that is displayed on the DOM. Also adds up the statistics to display in the stats container.

    displayLibrary() {
        let index = 0;      //defines an index that will be added to each delete and update button to allow us to find the item in the array
        bookHolder.innerHTML = '';
        this.myLibrary.forEach(obj => {

        let container = document.createElement('article');      //Creates a container to hold the new book
        container.classList.add('book');                        //Adds the book class to the container for styling

        //p elements to hold each of the book properties
        let bookTitle = document.createElement('h3');
        let bookAuthor = document.createElement('p');
        let bookPages = document.createElement('p');
        let bookRead = document.createElement('p');
        let delButton = document.createElement('button');
        delButton.classList.add('delete');
        delButton.setAttribute('id', index);
        index ++;

        let updateButton = document.createElement('button');
        updateButton.classList.add('updateButton');
        let para_holder = document.createElement('div');
        let button_holder = document.createElement('div');
        para_holder.classList.add('para');
        button_holder.classList.add('button_hol');


        //textContent for the p elements, used to display book data to the user.
        bookTitle.textContent = obj.title;
        bookAuthor.textContent = 'Written by: ' + obj.author;
        bookPages.textContent = 'Number of Pages: ' + obj.pages;
        if (obj.readStatus) {
            bookRead.textContent = 'This book has been read';
        }
        else {
            bookRead.textContent = 'This book has not been read';
        }
        delButton.textContent = 'Remove book';

        // delButton.addEventListener('click', ev => this.removeBook());

        //This works but isn't acceptable
        // let current = this;
        // delButton.addEventListener('click', function () {
        //     current.removeBook(index);
            // console.log(current);
        // });
        // delButton.addEventListener('click', function (e){
        //     console.log(e);
        //     btn.addEventListener('click', this.removeBook());

        // });
        updateButton.textContent = 'Change read status';


        //append the article container to the bookHolder, and each of the p elements to the article/container
        bookHolder.appendChild(container);
        container.appendChild(para_holder);
        container.appendChild(button_holder);
        para_holder.appendChild(bookTitle);
        para_holder.appendChild(bookAuthor);
        para_holder.appendChild(bookPages);
        para_holder.appendChild(bookRead);
        button_holder.appendChild(delButton);
        button_holder.appendChild(updateButton);
        // container.appendChild(delButton);

    });
    }

    // Triggered by remove button, this removes the book from the array, updates SaveData() and calls displayLibrary() to update the DOM
    removeBook(index) {
        console.log('works');
        // console.log('In function' + index);
        // this.myLibrary.splice(index, 1);
        // this.saveData();
        // this.displayLibrary();
    }

    // This is triggered by a user updating the books read status. It updates the status of the specified book, calls SaveData() and calls displayLibrary()
    updateReadStatus() {

    }

    // Saves the myLibrary array
    saveData = () => {
        localStorage.setItem('myLibrary', JSON.stringify(this.myLibrary));
    }

    //Reads the myLibrary array
    readData = () => {
        this.myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
        if (this.myLibrary === null) this.myLibrary = [];
        console.table(this.myLibrary);
        this.displayLibrary();
        // this.myLibrary.forEach(addBookToLibrary);
    }

}






//Constant to hold the library
const theLibrary = new Library();

//Data fields from the form
const titleInput = document.querySelector('#titleInput');       //const for the user entered title
const authorInput = document.querySelector('#authorInput');     //const for the user entered Author
const pagesInput = document.querySelector('#pagesInput');       //const for the user entered number of pages
const readInput = document.querySelector('#readInput');         //const for the user input asking whether they read the book or not

//Submit button for the form
const submitButton = document.querySelector('#submitBook');
submitButton.addEventListener('click', theLibrary.addBook);


//updateReadStatus button for each book
// const submitButton = document.querySelector('#submitBook');
// submitButton.addEventListener('click', theLibrary.addBook);

//Container to hold the books
const bookHolder = document.querySelector('#book-holder');

//Runs for each load
theLibrary.readData();


//Most recent struggle
//Adds an event listener to each 'remove book' button
// const removeButtons = document.querySelectorAll('.delete');
// removeButtons.forEach((btn) => {
//     btn.addEventListener('click', function (e) {
//         let index = e.target.id;
//         console.log(index);
//         // theLibrary.removeBook(index)
//     });
// });
















// Old Content

// let myLibrary = [];
// const titleInput = document.querySelector('#titleInput');       //const for the user entered title
// const authorInput = document.querySelector('#authorInput');     //const for the user entered Author
// const pagesInput = document.querySelector('#pagesInput');       //const for the user entered number of pages
// const readInput = document.querySelector('#readInput');         //const for the user input asking whether they read the book or not
// const bookHolder = document.querySelector('#book-holder');      //container to hold the books




// const submitButton = document.querySelector('#submitBook');     //submit button
// submitButton.addEventListener('click', addNewBook);    

// function addNewBook(){
//     let newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, true);
//     myLibrary.push(newBook);
//     saveLocal();
//     addAllToLibrary();
// }


// function Book(title, author, pages, read) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read;
// }

// function saveLocal(){
//     localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
// }

// function restoreLocal(){
//     myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
//     if (myLibrary === null) myLibrary = [];
//     myLibrary.forEach(addBookToLibrary);
// }

// function addAllToLibrary(){
//     addBookToLibrary(myLibrary[myLibrary.length-1]);
//     // myLibrary.forEach(addBookToLibrary);
// }

// function addBookToLibrary(obj){
//     let container = document.createElement('article');      //Creates a container to hold the new book
//     container.classList.add('book');                        //Adds the book class to the container for styling

//     //p elements to hold each of the book properties
//     let bookTitle = document.createElement('p');   
//     let bookAuthor = document.createElement('p');
//     let bookPages = document.createElement('p');
//     let bookRead = document.createElement('p');

//     //textContent for the p elements, used to display book data to the user.
//     bookTitle.textContent = 'Title: ' + obj.title;
//     bookAuthor.textContent = 'Author: ' + obj.author;
//     bookPages.textContent ='Pages: ' + obj.pages;
//     if (obj.read){
//         bookRead.textContent = 'Read';
//     }
//     else{
//         bookRead.textContent ='Not Read';
//     }

//     //append the article container to the bookHolder, and each of the p elements to the article/container
//     bookHolder.appendChild(container);
//     container.appendChild(bookTitle);
//     container.appendChild(bookAuthor);
//     container.appendChild(bookPages);
//     container.appendChild(bookRead);

// }



// restoreLocal();