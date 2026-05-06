const authMiddleware = (req, res, next) => {
    console.log("Auth middleware")
  if (req.session.user) {
    res.locals.user = req.session.user;
    next();
  } else {
    res.redirect("/login");
  }
};

module.exports = authMiddleware;
