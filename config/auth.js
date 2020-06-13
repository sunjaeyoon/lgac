module.exports = {
  ensureAuthenticated: function(req, res, next) {
    console.log("In the auth")
    if (req.isAuthenticated()) {
      console.log("auth line 5")
      return next();
    }
    console.log("auth line 8");
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/users/login');
  },
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/dashboard');      
  }
};
