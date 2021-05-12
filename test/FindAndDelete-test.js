const expect = require("chai").expect;
const should = require("chai").should();
const Mario = require("../models/marioChar");

describe("#find&Delete Section", () => {
  context("Database CRUD", function () {
    let mChar;
    this.beforeEach((done) => {
      mChar = new Mario({
        name: "Mario",
        weight: 60,
        age: 25,
      });
      mChar.save().then(function () {
        expect(mChar.isNew).to.be.false;
        done();
      });
    });

    it("finding a record", function (done) {
      Mario.findOne({ name: "Mario" }).then(function (result) {
        expect(result.name).to.be.deep.equal("Mario");
        // assert.deepEqual(result.name, "Mario");
        done();
      });
    });

    it("finding a record by ID", (done) => {
      Mario.findOne({ _id: mChar._id }).then((result) => {
        result._id.toString().should.be.deep.equal(mChar._id.toString());
        // assert.deepEqual(result._id.toString(), mChar._id.toString());
        done();
      });
    });

    it("deleting a record after finding", (done) => {
      Mario.findOneAndRemove({ name: "Mario" }).then(() => {
        Mario.findOne({ name: "Mario" }).then((result) => {
          expect(result).to.be.null;
          done();
        });
      });
    });
  });
});
