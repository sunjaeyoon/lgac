var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');


/* GET users listing. */
//Login
router.get('/login', forwardAuthenticated, function(req, res, next) {
  res.render('login');
});

//Register
router.get('/register', forwardAuthenticated, function(req, res, next) {
  res.render('register');
});

// Register
router.post('/register', (req, res) => {
  console.log(req.body)
  const { firstname, lastname, username, password, password2 } = req.body;
  let errors = [];

  if (!firstname || !lastname || !username || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 4) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    console.log("users 41");
    res.render('register', /*{
      errors,
      name,
      email,
      password,
      password2
    }*/);
  } else {
    console.log("users 50")
    User.findOne({ username: username }).then(user => {
      if (user) {
        errors.push({ msg: 'Username already exists' });
        res.render('register', /*{
          errors,
          name,
          username,
          password,
          password2
        }*/);
      } else {
        const newUser = new User({
          firstname,
          lastname,
          username,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  console.log(req.body)
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
