function Bookshelf(ownerName) {
  this.ownerName = ownerName;
  this.favoriteBooks = [];
};

function CardBox(ownerName) {
  Bookshelf.call(this, ownerName);
};

CardBox.prototype = Object.create(Bookshelf.prototype);

Bookshelf.prototype.addFavoriteBook = function (bookName) {
  if (!bookName.includes("Great")) {
    this.favoriteBooks.push(bookName);
  }
};

Bookshelf.prototype.printFavoriteBooks = function () {
  console.log(`${String(this.ownerName)} favorite Books: ${String(this.favoriteBooks.length)}`);
  for (let bookName of this.favoriteBooks) {
    console.log(bookName);
  }
};

Bookshelf.prototype.sortFavoriteBooksByAlphabeticDescendingOrder = function () {
  this.favoriteBooks.sort((a, b) => b.localeCompare(a));
};

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
var myBooks = new BookShelf(`Jack's`);
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
