const { createServer } = require('http');
const { Server } = require('socket.io');

let wsocket, httpServer;

module.exports = {
  init: app => {
    httpServer = createServer(app);
    wsocket = new Server(httpServer, {
      cors: {
        origin: '*'
      } // this will fix CORS issue in client side
    });

    return wsocket;
  },
  httpServer: () => {
    if (!httpServer) throw new Error('HTTPServer not initialized!');
    return httpServer;
  },
  getWSocket: () => {
    if (!wsocket) throw new Error('Websocket not initialized!');
    return wsocket;
  }
}
