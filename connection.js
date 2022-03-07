const mongoose = require('mongoose');

exports.connection = async (db) => {
  try {
    await mongoose.connect(db);
  } catch (e) {
    console.error("Can't connect to database!");
  }
}
