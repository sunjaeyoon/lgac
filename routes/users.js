var express = require('express');
var router = express.Router();
var path = require('path');
const bcrypt = require('bcryptjs');
const passport = require('passport')

const User = require('../models/User')
const { fowardAuthenticated } = require('../config/auth');

/*Redirect for CSS sheets (Not needed, manual reset through html file*/
/*app.use(express.static(path.join(__dirname, 'public')));*

/* GET Login Page */
router.get('/login', function(req, res, next) {
  res.render('login');
});

/* GET register Page */
router.get('/register', function(req, res, next) {
  res.render('register');
});

/* Register Handles */
router.post('/register', function(req, res, next) {
  //console.log(req.body);
  const {firstname, lastname, username, password, password2} = req.body;
  let errors = [];
  
  //check required fields
  if(!firstname || !lastname || !username || !password || !password2) {
    errors.push({msg: 'Please fill in all fields'});
  }
  
  //Check match
  if(password !== password2){
    errors.push({msg:'Passwords do not match'});
  }
  
  //Check password length
  const lownum = 5
  if(password.length < lownum){
    errors.push({msg:'Password ahould be longer than #{lownum} characters'});
  }
  
  //Send person back
  if(errors.length>0){
    console.log(errors);
    res.render('register'); //Needs addtional items
  }else{
    //res.send('pass'); Everything checks out
      User.findOne({username:username})
        .then(use => {
          if(use){
            errors.push({msg:'Username is already registered'});
            //res.send('Username taken');
            res.render('register')
          } else {
            //console.log("Here at the end")
            const newUser = new User({
              firstname, 
              lastname, 
              username, 
              password
            });
            //Hash Password
            bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash)=> {
             if(err) throw err;
             //Set password hash
             newUser.password = hash;
             //Save User
             newUser.save()
              .then(user => {
                req.flash('success_msg', 'You are now registered');
                res.redirect('login');
                })
                //res.send("You're signed up")})
              .catch(err => console.log(err))
             
             }))
            //console.log(newUser)
          }
        });
    
  }
});

// Login
router.post('/login', (req, res, next) => {
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
