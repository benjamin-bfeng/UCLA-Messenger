// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
const http = require('http');
const port = 3001;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Hello World!');
  res.end();
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
