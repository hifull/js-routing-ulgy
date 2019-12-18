const net = require('net');
const Response = require('./response');
const { createRequest } = require('./request');

module.exports = class Server {
  constructor(requestListener) {
    this.server = net.createServer();
    this.server.on('connection', (socket) => {
      console.log('user was connected');
      socket.once('readable', function() {
        if (socket._readableState.buffer.length === 0) return
        const request = createRequest(socket);
        const response = new Response(socket);
        requestListener(request, response)
			})
    });
  }

  listen(...args) {
    this.server.listen(...args);
  }

  close() {
    this.server.close();
  }
}