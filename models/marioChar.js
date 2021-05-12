const { inherits } = require("util");
const mongoose = require("mongoose");
const { Schema } = mongoose;

function marioSchema() {
  Schema.apply(this, arguments);

  this.add({
    name: String,
    weight: Number,
  });
}
inherits(marioSchema, Schema);

const marioChar = new marioSchema({ age: Number }, { timestamps: true });
const Mario = mongoose.model("Mario", marioChar);

module.exports = Mario;
