// CLASSES VERSION

// Book class
class Book {
  constructor(title, author, pages, haveRead) {
    // public properties
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
  }

  // public method
  toggleReadStatus() {
    this.haveRead = !this.haveRead;
  }
}

// Library class
class Library {
  // public field
  books = [];

  // public methods
  addBook(book) {
    this.books.push(book);
    this.update();
  }

  removeBook(id) {
    this.books.splice(id, 1);
    this.update();
  }

  update() {
    // re-render library with updated books in library object
    const libraryEl = document.querySelector(".library-grid");
    libraryEl.innerHTML = "";
    this.render(this.books);
  }

  // library render logic
  render(books) {
    const libraryEl = document.querySelector(".library-grid");

    books.forEach((book, i) => {
      const bookEl = document.createElement("div");
      bookEl.classList.add("book");
      bookEl.setAttribute("data-book-id", i);
      book.haveRead ? bookEl.classList.add("read") : "";

      // book elements
      const titleEl = document.createElement("h3");
      titleEl.textContent = book.title;

      const authorEl = document.createElement("h6");
      authorEl.textContent = book.author;

      const pagesEl = document.createElement("p");
      pagesEl.classList.add("pages");
      pagesEl.textContent = book.pages;

      // status & buttons
      const statusEl = document.createElement("div");
      statusEl.classList.add("status");

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";

      const readBtn = document.createElement("button");
      readBtn.textContent = "Read";

      // append elements (add to DOM)
      bookEl.appendChild(titleEl);
      bookEl.appendChild(authorEl);
      bookEl.appendChild(pagesEl);
      bookEl.appendChild(statusEl);

      statusEl.appendChild(readBtn);
      statusEl.appendChild(removeBtn);

      libraryEl.appendChild(bookEl);

      // event listeners
      readBtn.addEventListener("click", () => {
        // bookEl.classList.toggle('read');
        const bookId = bookEl.dataset.bookId;
        const book = library.books[bookId];
        book.toggleReadStatus();
        book.haveRead
          ? bookEl.classList.add("read")
          : bookEl.classList.remove("read");
      });

      removeBtn.addEventListener("click", () => {
        const bookId = bookEl.dataset.bookId;
        library.removeBook(bookId);
      });
    });
  }
}

// form logic
function setupFormListeners() {
  const dialog = document.querySelector("dialog");
  const showDialog = document.querySelector(".add-book");
  const cancelDialog = document.querySelector(".cancel");
  const addBook = document.querySelector("form");

  showDialog.addEventListener("click", () => {
    dialog.showModal();
  });

  cancelDialog.addEventListener("click", () => {
    dialog.close();
  });

  addBook.addEventListener("submit", e => {
    e.preventDefault();

    // add a new book to library object
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const readStatus = document.getElementById("read-status").checked;

    const newBook = new Book(title, author, pages, readStatus);
    // myLibrary.push(newBook);
    // update();
    library.addBook(newBook);

    dialog.close();
  });
}

// library initialization with default constructor
const library = new Library();
setupFormListeners();

// default books initializations
const eatThatFrog = new Book("Eat That Frog", "Brian Tracy", 144, true);
const healYourLife = new Book(
  "You Can Heal Your Life",
  "Louise Hay",
  272,
  false
);

library.addBook(eatThatFrog);
library.addBook(healYourLife);

// const lawsOfPower = new Book("The 48 Laws of Power", "Robert Greene", 452, true);
// const superiorMan = new Book("The Way of the Superior Man", "David Deida", 224, false);
// const cantHurtMe = new Book("Can't Hurt Me", "David Goggins", 364, true);
// const talkToAnyone = new Book("How to Talk to Anyone", "Leil Lowndes", 368, true);
// const rudestBookEver = new Book("The Rudest Book Ever", "Shwetabh Gangwar", 232, false);
// const braveNewWorld = new Book("Brave New World", "Aldous Huxley", 311, true);
// const mockingbird = new Book("To Kill a Mockingbird", "Harper Lee", 281, false);
// const mobyDick = new Book("Moby-Dick", "Herman Melville", 635, false);
