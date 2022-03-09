const wsocket = require('./socket');

const PORT = process.env.PORT || 8080;

module.exports = app => {
  wsocket.init(app).on('connection', (socket) => {
    console.log('Client connected!');
  });

  wsocket.httpServer().listen(PORT);
}
