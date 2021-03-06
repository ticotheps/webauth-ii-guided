const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');

// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // Step 4: Add 'req.session.user = user;' statement to store session data (from express-session)
        // Step 5: Simplify 'restricted-middleware.js' due to addition of express-session
        req.session.user = user;

        res.status(200).json({
          message: `Welcome ${user.username}!`,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/logout', (req, res) => {

  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(500).json({ message: "You can checkout any time you like, but you can't leave" })
;      } else {
        res.status(200).json({ message: 'Bye, Felicia!' });
      }
    })
  } else {
    res.status(200).json({ message: 'Bye, Felicia!' });
  }
});

module.exports = router;
