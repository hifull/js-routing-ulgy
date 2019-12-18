const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log(req.url);
  let htmlReadStream;

  if (req.url.match('.js')) {
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    htmlReadStream = fs.createReadStream(__dirname + req.url, 'utf8');
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    htmlReadStream = fs.createReadStream(__dirname + '/index.html', 'utf8');
  }

  htmlReadStream.pipe(res);
}).listen(3000)