// setting .env(process.env.VAR_NAME) - https://www.npmjs.com/package/dotenv
require('dotenv').config();
const PORT = process.env.PORT || 8080;

module.exports = app => {
  const server = app.listen(PORT)
  const wsocket = require('socket.io')(server);
  wsocket.on('connection', (socket) => {
    console.log('Client connected!');
  });
}
