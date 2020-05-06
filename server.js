const express = require('express');
const userRouter = require('./users/userRouter.js');

const server = express();

// global middleware
server.use(express.json());



//custom middleware
/*- `logger()`
  - `logger` logs to the console the following information about each request: request method, request url, and a timestamp
  - this middleware runs on every request made to the API
  */

function logger(req, res, next) {
  const timestamp = new Date();
  console.log(`[${timestamp}] | Method: ${req.method} | Req URL: ${req.url}`)
  next();
};
server.use(logger);
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
