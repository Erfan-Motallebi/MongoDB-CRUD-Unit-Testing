const expect = require("chai").expect;
const { assert } = require("chai");
const Author = require("../models/Author");
const mongoose = require("mongoose");

describe("nesting a sub-document", () => {
  beforeEach((done) => {
    mongoose.connection.collections.authors.drop(() => {
      done();
    });
  });

  context("Creating a Author nested document", () => {
    it("doing the creation of an Author Nested Elements", (done) => {
      const pat = new Author({
        name: "Patrick Ruthfuss",
        age: 36,
        books: [{ title: "Name Of The Wind", pages: 400 }],
      });
      pat.save().then(() => {
        Author.findOne({ $where: () => this.age === 36 }).then((result) => {
          expect(result.books.length === 1);
          done();
        });
      });
    });

    it("adding a new book", (done) => {
      const pat = new Author({
        name: "Patrick Ruthfuss",
        age: 36,
        books: [{ title: "Name Of The Wind", pages: 400 }],
      });
      pat.save().then(() => {
        Author.findOne({ age: { $eq: 36 } }).then((record) => {
          record.books.push({ title: "Wise Man's Fear", pages: 652 });
          record.save().then(() => {
            Author.findOne({ name: "Patrick Ruthfuss" }).then(() => {
              assert.isTrue(record.books.length === 2);
              done();
            });
          });
        });
      });
    });
  });
});
