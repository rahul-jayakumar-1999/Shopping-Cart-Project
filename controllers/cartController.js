const { Admin } = require("mongodb");

module.exports = {
  getCart: (req, res) => {
    res.render("user/cart", { title: "Cart" });
  },
};
