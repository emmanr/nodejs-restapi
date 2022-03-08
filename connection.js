const mongoose = require('mongoose');

const connection = async (db) => {
  try {
    await mongoose.connect(db);
  } catch (e) {
    console.error("Can't connect to database!");
  }
}

module.exports = connection;
