const mongoose = require("mongoose");
const { Schema } = mongoose;
const { inherits } = require("util");

function AuthorFunc() {
  Schema.apply(this, arguments);

  this.add({
    name: String,
    age: Number,
    books: [BookSchema],
  });
}
inherits(AuthorFunc, Schema);

function BookFunc() {
  Schema.apply(this, arguments);

  this.add({
    title: String,
    pages: Number,
  });
}
inherits(BookFunc, Schema);

const BookSchema = new BookFunc({}, { timestamps: true });
const AuthorSchema = new AuthorFunc({}, { timestamps: true });

const Author = mongoose.model("Author", AuthorSchema);

module.exports = Author;
