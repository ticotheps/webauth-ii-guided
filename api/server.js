const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session'); // Step 1: Install and import 'express-session'

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

// Step 3: Configure session settings.
const sessionConfig = {
  name: 'monster',
  secret: 'keep it secret, keep it safe!',
  cookie: {
    maxAge: 1000 * 60 * 10, // => 10 minutes (in milliseconds)
    secure: false, // Use cookie over https? 'false' during dev, 'true' during production;
    httpOnly: true, // Can JS access the cookie on the browser?
  },
  resave: false, // avoid recreating unchanged session data
  saveUninitialized: false, 
  // "false" = does not force users to accept cookies, follows FDPR compliance
  // "true" = forces user to accept cookies
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig)); // Step 2: Tell server to use 'express-session'

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send("It's alive!");
});

module.exports = server;
