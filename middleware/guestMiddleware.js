const guestMiddleware = (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/"); // already logged in → go home
  }
  next();
};

module.exports = guestMiddleware;