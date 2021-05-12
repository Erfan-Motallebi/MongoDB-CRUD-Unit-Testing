const mongoose = require("mongoose");

before("#beforeTest()", function (done) {
  mongoose.connect("mongodb://localhost:27017/devOps", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  mongoose.connection
    .once("open", function () {
      console.info("connected to the database [ devOps ]");
      done();
    })
    .on("error", (err) => {
      console.error.bind(console, "Connection failed : ", err);
    });
});

beforeEach("Deleting Database", (done) => {
  mongoose.connection.collections.marios.drop(() => {
    done();
  });
});

afterEach("Test done", () => {
  console.log("--Done--\n");
});
