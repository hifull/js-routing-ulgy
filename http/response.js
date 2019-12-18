const { STATUS_CODES } = require('http');

module.exports = class Response {
  constructor(socket) {
    this.socket = socket;
    this.headers = {};
    this.statusCode = 200;
    this.headerSent = false;
  }

  setStatus(status) {
    this.statusCode = status;  
  }

  setHeader(key, value) {
    this.headers[key] = value;
  }
  
  writeHead(statusCode, headers) {
    if (!this.headerSent) {
      this.headerSent = true;
      for (let key in headers) {
        this.setHeader(key, headers[key])
      }
      this.setHeader('Date', new Date().toGMTString())
      this.socket.write(`HTTP/1.1 ${statusCode} ${STATUS_CODES[statusCode]}\r\n`)
			for (const key in this.headers) {
				this.socket.write(`${key}: ${this.headers[key]}\r\n`)
			}
			this.socket.write('\r\n')
    }
  }

  write(str) {
    this.socket.write(str + '\r\n');
  }

  end(chunk) {
    console.log('SOCKET KILLED')
    this.socket.end();
  }
}