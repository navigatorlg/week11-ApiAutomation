const { expect } = require("chai");
const BooksApi = require("../api/books-api");

const newBookTitle = BooksApi.getNewBookTitle(6);
const newName = { title: newBookTitle, author: "YuriyD" };

describe("book store api testing", async () => {
  // CREATE BOOK
  it("create a book", async () => {
    // creating a book
    const newBook = await BooksApi.createBook(newName);
    // verifing data from a new book
    const getABook = await BooksApi.getBookById(newBook.id);
    expect(getABook.id).to.be.a("string");
    expect(getABook.id).to.have.lengthOf(32);
    expect(getABook.title).to.be.a("string");
    expect(getABook.title.length > 0).to.be.true;
    expect(getABook.author).equal("YuriyD");
  });
  // GET ALL BOOKS
  it("get all books", async () => {
    // requesting a response from all books
    const getAllBooksResponse = await BooksApi.getAllBooks();
    // looping through all books verifying information
    getAllBooksResponse.forEach(async (book) => {
      expect(book.id.length).equal(32);
      expect(book.title.length > 0).to.be.true;
      expect(book.author.length > 0).to.be.true;
    });
  });

  // GET A SINGLE BOOK
  it("get a book", async () => {
    // creating a new book
    const newBook = await BooksApi.createBook(newName);
    // getting a book with verification
    const getABook = await BooksApi.getBookById(newBook.id);
    expect(getABook.id).to.be.a("string");
    expect(getABook.id).to.have.lengthOf(32);
    expect(getABook.title).to.be.a("string");
    expect(getABook.title.length > 1).to.be.true;
    expect(getABook.author).equal("YuriyD");
  });

  // UPDATE A BOOK
  it("update a book", async () => {
    // creating a new book
    const newBook = await BooksApi.createBook(newName);
    // changing title, author in a book
    const bookUpdated = await BooksApi.updateBook(
      newBook.id,
      newBookTitle + newBookTitle
    );
    expect(bookUpdated.author).equal(newBook.author);
    expect(bookUpdated.title).not.equal(newBook.title);
  });

  //  DELETE A BOOK
  it("delete a book", async () => {
    // creating a book
    const newBook = await BooksApi.createBook(newName);
    // deleting a book
    const bookDelete = await BooksApi.deleteBook(newBook.id);
    expect(bookDelete).equal("Book was removed successfully");
  });
});
