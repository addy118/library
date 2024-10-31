// client-side library logic
const myLibrary = [];
renderLibrary(myLibrary);

function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
};

function addBookToLibrary(book) {
    myLibrary.push(book);
    updateLibrary();
};

function removeBookFromLibrary(id) {
    myLibrary.splice(id, 1);
    updateLibrary();
}

// dummy books
const eatThatFrog = new Book("Eat That Frog", "Brian Tracy", 144, true);
const healYourLife = new Book("You Can Heal Your Life", "Louise Hay", 272, false);
// const lawsOfPower = new Book("The 48 Laws of Power", "Robert Greene", 452, true);
// const superiorMan = new Book("The Way of the Superior Man", "David Deida", 224, false);
// const cantHurtMe = new Book("Can't Hurt Me", "David Goggins", 364, true);
// const talkToAnyone = new Book("How to Talk to Anyone", "Leil Lowndes", 368, true);
// const rudestBookEver = new Book("The Rudest Book Ever", "Shwetabh Gangwar", 232, false);
// const braveNewWorld = new Book("Brave New World", "Aldous Huxley", 311, true);
// const mockingbird = new Book("To Kill a Mockingbird", "Harper Lee", 281, false);
// const mobyDick = new Book("Moby-Dick", "Herman Melville", 635, false);

addBookToLibrary(eatThatFrog);
addBookToLibrary(healYourLife);



// library render logic
function renderLibrary(library) {
    library.forEach((book, i) => {
        const library = document.querySelector('.library-grid');

        const bookEl = document.createElement('div');
        bookEl.setAttribute('data-book-id', i);

        const titleEl = document.createElement('h3');
        const authorEl = document.createElement('h6');
        const pagesEl = document.createElement('p');

        const statusEl = document.createElement('div');
        statusEl.classList.add('status');

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        const readBtn = document.createElement('button');
        readBtn.textContent = 'Read'

        bookEl.classList.add('book');
        book.haveRead ? bookEl.classList.add('read') : '';
        pagesEl.classList.add('pages');

        library.appendChild(bookEl);
        bookEl.appendChild(titleEl);
        bookEl.appendChild(authorEl);
        bookEl.appendChild(pagesEl);
        bookEl.appendChild(statusEl);

        statusEl.appendChild(readBtn);
        statusEl.appendChild(removeBtn);

        titleEl.textContent = book.title;
        authorEl.textContent = book.author;
        pagesEl.textContent = book.pages;

        readBtn.addEventListener('click', () => {
            // bookEl.classList.toggle('read');
            const bookId = bookEl.dataset.bookId;
            const book = myLibrary[bookId];
            book.haveRead = !book.haveRead;
            book.haveRead ? bookEl.classList.add('read') : bookEl.classList.remove('read');
        })

        removeBtn.addEventListener('click', () => {
            const bookId = bookEl.dataset.bookId
            removeBookFromLibrary(bookId);
        });
    });
};

function updateLibrary() {
    // re-render library with updated books in library object
    const library = document.querySelector('.library-grid');
    library.innerHTML = '';
    renderLibrary(myLibrary);
}



// form logic
const dialog = document.querySelector('dialog');
const showDialog = document.querySelector('.add-book');
const cancelDialog = document.querySelector('.cancel')
const addBook = document.querySelector('form');

showDialog.addEventListener('click', () => {
    dialog.showModal();
});

cancelDialog.addEventListener('click', () => {
    dialog.close();
});

addBook.addEventListener('submit', (e) => {
    e.preventDefault();

    // add a new book to library object
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const readStatus = document.getElementById('read-status').checked;


    const newBook = new Book(title, author, pages, readStatus);
    // myLibrary.push(newBook);
    // updateLibrary();
    addBookToLibrary(newBook);

    dialog.close();
});
