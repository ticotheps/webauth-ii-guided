const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session'); // Step 1: Install and import 'express-session'
const KnexSessionStore = require('connect-session-knex')(session); // Step 6: Install and import 'connect-session-knex'
// Step 7: Curry '(session)' on to the 'const KnexSessionStore' variable above.

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
// Step 8: Import 'configuredKnex' from dbConfig.js file
const configuredKnex = require('../database/dbConfig.js');

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

  // Step 9: Create a new key/value pair inside the 'sessionConfig' object for 'store'
  store: new KnexSessionStore({
    knex: configuredKnex,
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 30, // delete expired sessions
  }),
};

// Step 4: Add 'req.session.user' statement to store session data (from express-session)

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
