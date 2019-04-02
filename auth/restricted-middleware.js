// const bcrypt = require('bcryptjs');

// const Users = require('../users/users-model.js');

// ----------NO LONGER NEEDS THIS CODE ABOVE----------

// Step 5: Simplify 'restricted-middleware.js' due to addition of express-session
// Step 6: Modify 'sessionConfig' object in server.js file.
module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "Invalid Credentials" });
  }

  // --------NO LONGER NEEDS THIS CODE BELOW----------
  // const { username, password } = req.headers;

  // if (username && password) {
  //   Users.findBy({ username })
  //     .first()
  //     .then(user => {
  //       if (user && bcrypt.compareSync(password, user.password)) {
  //         next();
  //       } else {
  //         res.status(401).json({ message: 'Invalid Credentials' });
  //       }
  //     })
  //     .catch(error => {
  //       res.status(500).json({ message: 'Ran into an unexpected error' });
  //     });
  // } else {
  //   res.status(400).json({ message: 'No credentials provided' });
  // }
};
