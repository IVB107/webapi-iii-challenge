const express = require('express');

const helmet = require('helmet');

const userRouter = require('./data/users/user-router.js');

const postRouter = require('./data/posts/post-router.js');

const server = express();

// middleware

server.use(express.json());
server.use(helmet());


// routing

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the thunderdome</h1>
  `)
});


module.exports = server;