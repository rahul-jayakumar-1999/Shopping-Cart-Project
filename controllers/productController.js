const fs = require("fs");
const path = require("path");

const productModel = require("../models/productModel.js");
const categorys = require("../config/category.js");

module.exports = {
  getAddProduct: (req, res) =>
    res.render("admin/add-product", { categorys, admin: true }),

  getProduct: (req, res) => {
    productModel
      .getProduct()
      .then((products) => {
        res.render("admin/view-products", { products, admin: true });
      })
      .catch((err) => {
        console.error("ERROR: " + err);
      });
  },

  addProduct: (req, res) => {
    let image = req.files.image;
    productModel
      .createProduct(req.body)
      .then((result) => {
        const id = result.insertedId;

        let ext = path.extname(image.name); // ".jpg"

        const uploadDir = path.join(__dirname, "..", "public", "uploads");

        fs.mkdirSync(uploadDir, { recursive: true });

        const fileName = id + ext;

        const filePath = path.join(uploadDir, fileName);

        image.mv(filePath, (err, done) => {
          if (err) {
            console.log("uplaod failed");
            return;
          }
          productModel
            .updateImage(id, fileName)
            .then(() => {
              res.render("admin/add-product", { categorys, admin: true });
            })
            .catch((err) => {
              console.error("ERROR" + err);
            });
        });
      })
      .catch((err) => {
        console.error("ERROR: " + err);
      });
  },
};
