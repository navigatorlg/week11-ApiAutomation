const { expect } = require("chai");
const axios = require("axios");

const baseUrl =
  "https://f4hatlr72b.execute-api.us-east-1.amazonaws.com/production";
let id;

describe("book store api testing", async () => {
  // GET ALL BOOKS
  it("get all books", async () => {
    const books = await axios.get(`${baseUrl}/books`);
    expect(books.status).equal(200);
  });

  // CREATE BOOK
  it("create a book", async () => {
    const newBook = await axios.post(`${baseUrl}/books`, {
      title: "Study hard",
      author: "Yuriy D",
    });
    id = newBook.data.id;
    const book = await axios.get(`${baseUrl}/${id}`);
    expect(book.status).equal(200);
    expect(newBook.data.author).equal("Yuriy D");
    expect(newBook.data.title).equal("Study hard");
  });

  // GET A SINGLE BOOK
  it("get a book", async () => {
    const book = await axios.get(`${baseUrl}/${id}`);
    expect(book.status).equal(200);
  });

  // UPDATE A BOOK
  it("update a book", async () => {
    const bookUpdated = await axios.put(`${baseUrl}/${id}`, {
      title: "Study hard 2",
      author: "Yuriy",
    });
    expect(bookUpdated.data.author).equal("Yuriy");
    expect(bookUpdated.data.title).equal("Study hard 2");
  });

  //  DELETE A BOOK
  it("delete a book", async () => {
    const bookDelete = await axios.delete(`${baseUrl}/${id}`);
    expect(bookDelete.status).equal(200);
  });
});
