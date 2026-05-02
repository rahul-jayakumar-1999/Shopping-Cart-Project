const fs = require("fs");
const path = require("path");

const productModel = require("../models/productModel.js");

const categorys = ["mobile", "home appliances", "Speaker", "Tv"];

module.exports = {
  getProduct: function (req, res) {
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
  },

  getAddProduct: (req, res) => {
    res.render("admin/add-product", { categorys, admin: true });
  },
  addProduct: (req, res) => {
    let image = req.files.image;
    productModel.createProduct(req.body).then((result) => {
      const id = result.insertedId;

      let ext = path.extname(image.name); // ".jpg"

      const uploadDir = path.join(__dirname, "..", "public", "uploads");

      fs.mkdirSync(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, id + ext);

      image.mv(filePath, (err, done) => {
        if (err) {
          console.log("uplaod failed");
          return;
        }   
        res.render("admin/add-product", {categorys, admin: true});
      });
    });
  },
};
