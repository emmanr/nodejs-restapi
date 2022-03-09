const wsocket = require('./socket');

// setting .env(process.env.VAR_NAME) - https://www.npmjs.com/package/dotenv
require('dotenv').config();
const PORT = process.env.PORT || 8080;

module.exports = app => {
  wsocket.init(app).on('connection', (socket) => {
    console.log('Client connected!');
  });

  wsocket.httpServer().listen(PORT);
}
