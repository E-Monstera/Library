
// Class for the book objects
class Book {
    constructor(title, author, pages, readStatus) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
    }
}

//This class is used to maintain the library and each individual book within it, as well as the statistics.
class Library {

    //Constructor for the myLibrary array
    myLibrary;
    constructor() {
        this.myLibrary = [{}];

    }

    //Function to add a new book. It checks to see if the read checkbox was checked (true) or not(false), then creates a new book by calling the Book class. Finally it adds the new book to the library array and saves the data
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
        bookHolder.innerHTML = '';  //Empties out the bookHolder

        //constants to hold statistics
        let totalBooks = 0;
        let readBooks = 0;
        let totalPages = 0;


        this.myLibrary.forEach(obj => {
            //Container to hold the new book
            let container = document.createElement('article');      
            container.classList.add('book');                        


            //Holders for the book description and buttons
            let para_holder = document.createElement('div');
            let button_holder = document.createElement('div');
            para_holder.classList.add('para');
            button_holder.classList.add('button_hol');


            //p elements to hold each of the book properties
            let bookTitle = document.createElement('h3');
            let bookAuthor = document.createElement('p');
            let bookPages = document.createElement('p');
            let bookRead = document.createElement('p');


            //Creates and adds class/id to the delete book button. Additionally, adds text content
            let delButton = document.createElement('button');
            delButton.classList.add('delete');
            delButton.setAttribute('id', index);
            delButton.textContent = 'Remove book';


            //Creates and adds class/id to the update book button. Additionally, adds text content
            let updateButton = document.createElement('button');
            updateButton.classList.add('updateButton');
            updateButton.setAttribute('id', index);
            updateButton.textContent = 'Change read status';


            //textContent for the p elements, used to display book data to the user.
            bookTitle.textContent = obj.title;
            bookAuthor.textContent = 'Written by: ' + obj.author;
            bookPages.textContent = 'Number of Pages: ' + obj.pages;
            if (obj.readStatus) {
                bookRead.textContent = 'This book has been read';
                readBooks ++;                                           //This adds 1 to the total number of read books
            }
            else {
                bookRead.textContent = 'This book has not been read';
            }


            //Adds up the statistics
            totalBooks ++;
            totalPages += parseInt(obj.pages);


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

           //Adds one to the index for the next book
           index++;
        });

        //This occurs after each book element has been added to the DOM
        //Updates the statistics 

        //Queries the table data that needs to be updated
        const totalBooksTD = document.querySelector('#total-books');
        const readBooksTD = document.querySelector('#read-books');
        const unreadBooksTD = document.querySelector('#unread-books');
        const totalPagesTD = document.querySelector('#total-pages');

        //Updates the textcontent for each element
        totalBooksTD.textContent = totalBooks;
        readBooksTD.textContent = readBooks;
        unreadBooksTD.textContent = (totalBooks - readBooks);
        totalPagesTD.textContent = totalPages;


    }

    // Triggered by remove button, this removes the book from the array, updates SaveData() and calls displayLibrary() to update the DOM
    removeBook(index) {
        console.log('Removing index: ' + index);
        this.myLibrary.splice(index, 1);
        this.saveData();
        this.displayLibrary();
    }


    // This is triggered by a user updating the books read status. It updates the status of the specified book, calls SaveData() and calls displayLibrary()
    updateReadStatus(index) {
        if (this.myLibrary[index].readStatus) {
            this.myLibrary[index].readStatus = false;
        }
        else {
            this.myLibrary[index].readStatus = true;
        }
        this.saveData();
        this.displayLibrary();
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

//Container to hold the books
const bookHolder = document.querySelector('#book-holder');

//Runs for each load
theLibrary.readData();




// Used to add event listeners for the DOM buttons
function hasClass(elem, className) {
    return elem.classList.contains(className);
}

//Adds event listeners to the removebuttons
const removeButtons = document.querySelectorAll('.delete');
bookHolder.addEventListener('click', function (e) {
    if (hasClass(e.target, 'delete')) {
        let index = e.target.id;
        theLibrary.removeBook(index);
    }
});

//Adds event listeners to the change read status buttons
const updateButtons = document.querySelectorAll('.updateButton');
bookHolder.addEventListener('click', function (e) {
    if (hasClass(e.target, 'updateButton')) {
        let index = e.target.id;
        theLibrary.updateReadStatus(index);
    }
});