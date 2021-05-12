const expect = require("chai").expect;
const { assert } = require("chai");
const Mario = require("../models/marioChar");

describe("Update Section", function () {
  it("update connection", () => {
    beforeEach((done) => {
      const mChar = new Mario({
        name: "Mario",
        weight: 60,
        age: 25,
      });
      mChar.save().then(function () {
        expect(mChar.isNew).to.be.false;
        done();
      });
    });
  });

  it("updating a field", (done) => {
    Mario.findOneAndUpdate({ age: 25 }, { age: 30 }).then(() => {
      Mario.findOne({
        $and: [{ age: 30 }, { name: "Mario" }],
      }).then((result) => {
        expect(result.age).to.be.deep.equal(30);
        done();
      });
    });
  });

  it("updating a field by 1", () => {
    beforeEach((done) => {
      const mChar = new Mario({
        name: "Mario",
        weight: 60,
        age: 25,
      });
      mChar.save().then(function () {
        expect(mChar.isNew).to.be.false;
        done();
      });
    });
    Mario.findOneAndUpdate({ age: 25 }, { $inc: { age: 1 } }).then(() => {
      Mario.findOne({ age: { $in: [26, 29, 30, 31, 32] } }).then((record) => {
        assert(record.age === 26);
        done();
      });
    });
  });
});
