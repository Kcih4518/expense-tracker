module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', 'Please log in before you can use it!')
    res.redirect('/users/login')
  }
}
