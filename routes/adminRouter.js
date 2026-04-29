var express = require("express");
const { route } = require("./userRouter");
var router = express.Router();

// Admin Router
router.get("/", function (req, res, next) {
  const products = [
    {
      name: "Wireless Mouse",
      category: "Electronics",
      description:
        "Ergonomic wireless mouse with USB receiver and long battery life",
      price: 15.99,
      image: "../images/Wireless Mouse.webp",
    },
    {
      name: "Running Shoes",
      category: "Footwear",
      description:
        "Lightweight running shoes with breathable mesh and cushioned sole",
      price: 49.99,
      image: "../images/Running Shoes.jpg",
    },
    {
      name: "Coffee Maker",
      category: "Home Appliances",
      description: "Automatic drip coffee maker with programmable timer",
      price: 29.99,
      image: "../images/Coffee Maker.jpg",
    },
    {
      name: "Backpack",
      category: "Accessories",
      description:
        "Durable backpack with multiple compartments and laptop sleeve",
      price: 25.5,
      image: "../images/Backpack.webp",
    },
    {
      name: "Bluetooth Speaker",
      category: "Electronics",
      description:
        "Portable speaker with high-quality sound and 10-hour battery",
      price: 39.99,
      image: "../images/Bluetooth Speaker.webp",
    },
  ];
  res.render("admin/view-products", { products, admin: true });
});

router.get("/add-product", function (req, res) {
  const categorys = ["mobile", "home appliances", "Speaker", "Tv"];
  res.render("admin/add-product", { categorys, admin: true });
});

router.post("/add-product", (req, res) => {
  console.log(req.body);
  console.log(req.files.image);
});
module.exports = router;
