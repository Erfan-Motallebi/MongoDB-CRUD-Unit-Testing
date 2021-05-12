// const assert = require("assert");
const expect = require("chai").expect;
const { assert } = require("chai");
const Mario = require("../models/marioChar");
const should = require("chai").should();

describe("#save()", function () {
  context("Database Saving..", function () {
    it("saves to the database", function (done) {
      let mChar = new Mario({
        name: "Mario",
      });
      mChar.save().then(() => {
        assert.isFalse(mChar.isNew);
        done();
      });
    });
  });
});
