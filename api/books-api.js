"use strict";
const Client = require("./client-api");
const { expect } = require("chai");

class BooksApi {
  async createBook(name) {
    const newBook = await Client.post(name);
    expect(newBook.status).equal(201);
    return newBook.data;
  }

  async getAllBooks() {
    const allBooks = await Client.getAll();
    expect(allBooks.status).equal(200);
    return allBooks.data.body;
  }

  async getBookById(bookId) {
    const getBook = await Client.getAbook(bookId);
    expect(getBook.status).equal(200);

    return getBook.data;
  }

  async updateBook(bookId, updatedTitle) {
    const response = await Client.put(bookId, {
      title: updatedTitle,
      author: "YuriyD",
    });
    expect(response.status).equal(200);

    return response.data;
  }

  async deleteBook(bookId) {
    const response = await Client.delete(bookId);
    expect(response.status).to.equal(200);

    return response.data.message;
  }
  // creating a function for generating a random title for a book
  getNewBookTitle(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}

module.exports = new BooksApi();
