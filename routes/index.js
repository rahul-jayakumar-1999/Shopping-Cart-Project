var express = require("express");
var router = express.Router();

/* GET home page. */
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
  res.render("index", { title: "Shopping Cart", products, admin: false });
});

module.exports = router;
