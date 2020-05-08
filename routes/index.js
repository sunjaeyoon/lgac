var express = require('express');
var router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

//Unprotected dash
router.get('/dashboard', ensureAuthenticated, (req, res, next) => res.send("Yeah you made it"));
  //res.render('dashboard');*/

//DASH PROTECTED
/*router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);*/



module.exports = router;
