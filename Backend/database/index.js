const mongoose = require("mongoose");

const { DB } = require("../app/config");

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
module.exports = db;

