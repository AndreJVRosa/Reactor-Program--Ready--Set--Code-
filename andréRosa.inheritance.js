//New parent Object created
function BookStorage(ownerName) {
  this.ownerName = ownerName;
  this.favoriteBooks = [];
};

//Added the properties from Bookshelf and CardBox
BookStorage.prototype.addFavoriteBook = function (bookName) {
  if (!bookName.includes("Great")) {
    this.favoriteBooks.push(bookName);
  }
};

BookStorage.prototype.printFavoriteBooks = function () {
  console.log(`${String(this.ownerName)} favorite Books: ${String(this.favoriteBooks.length)}`);
  for (let bookName of this.favoriteBooks) {
    console.log(bookName);
  }
};

BookStorage.prototype.sortFavoriteBooksByAlphabeticDescendingOrder = function () {
  this.favoriteBooks.sort((a, b) => b.localeCompare(a));
};


//Inheritance of the constructor without the use of the Keyword Extends
function BookShelf(ownerName){
  BookStorage.call(this, ownerName);
};

function CardBox(ownerName) {
  BookStorage.call(this, ownerName);
};

//Inheritance of the prototypes without the use of the Keyword Extends
BookShelf.prototype = Object.create(BookStorage.prototype);
CardBox.prototype = Object.create(BookStorage.prototype);



//Unchanged Code
function loadBooks(bookshelf) {
  fakeAjax(BOOK_API, function onBooks(bookNames) {
    for (let bookName of bookNames) {
      bookshelf.addFavoriteBook(bookName);
    }
    bookshelf.sortFavoriteBooksByAlphabeticDescendingOrder();
    bookshelf.printFavoriteBooks();
  });
}

var BOOK_API = "https://some.url/api";
var myBooks = new Bookshelf(`Jack's`);
loadBooks(myBooks);

var myBox = new CardBox(`Other Jack's`);
loadBooks(myBox);

// NOTE: don't modify this function at all
function fakeAjax(url, cb) {
  setTimeout(function fakeLoadingDelay() {
    cb([
      "A Song of Ice and Fire",
      "The Great Gatsby",
      "Crime & Punishment",
      "Great Expectations",
      "You Don't Know JS",
    ]);
  }, 500);
}
