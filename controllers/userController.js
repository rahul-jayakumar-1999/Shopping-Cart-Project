const bcrypt = require("bcrypt");

const userModel = require("../models/userModel.js");

module.exports = {
  getUserLogin: (req, res) => res.render("user/login", { title: "Login" }),

  getUserSignup: (req, res) => res.render("user/Signup", { title: "Login" }),

  userSignUp: (req, res) => {
    const { name, email, password } = req.body;

    bcrypt
      .hash(password, 10)
      .then((hasedPassword) => {
        return userModel.createUser({ name, email, password: hasedPassword });
      })
      .then(() => {
        console.log("User Created Successfully");
      })
      .catch((err) => {
        console.error("ERROR" + err);
      });
  },

  userLogin: (req, res) => {
    const { email, password } = req.body;

    userModel
      .findByEmail(email)
      .then((user) => {
        console.log(user);
        if (!user) {
          throw new Error("User not found");
        }

        return bcrypt.compare(password, user.password).then((isMatch) => {
          if (!isMatch) {
            throw new Error("Wrong Password");
          }
        });
      })
      .then(() => {
        console.log("Login Successfull");
      })
      .catch((err) => {
        console.error("ERROR " + err);
      });
  },
};
