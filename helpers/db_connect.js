const mongoose = require('mongoose');

const connection = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rqjpq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`);
  } catch (e) {
    console.error("Can't connect to database!");
  }
}

module.exports = connection;
