const adminModel = require("../models/admin.model.js");

module.exports = {
  login: (req, res) => res.render("admin/login", { title: "Admin Login" }),

  adminLogin: async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    const admin = await adminModel.findAdminByEmail(email);

    if (!admin) {
      console.log("Admin Not Found");
      return;
    }

    req.session.admin = {
      _id: admin._id,
      email: admin.email,
    };

    req.session.adminLoggedIn = true;

    console.log(req.session);
    res.redirect("/admin");
  },

  adminLogout: (req, res) => {
    req.session.admin = null;
    req.session.adminLoggedIn = false;

    res.redirect("/admin/login");
  },
};
