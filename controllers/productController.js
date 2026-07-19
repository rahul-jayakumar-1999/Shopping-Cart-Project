const fs = require("fs");
const path = require("path");

const productModel = require("../models/productModel.js");
const cartModel = require("../models/cartModel.js");
const categorys = require("../config/category.js");

module.exports = {
  getAddProduct: (req, res) =>
    res.render("admin/add-product", { categorys, admin: true }),

  displayProducts: async (req, res) => {
    let userId = req.session.user._id;
    let cartCount = await cartModel.cartCount(userId);
    // console.log(cartCount);
    productModel
      .getProduct()
      .then((products) => {
        res.render("user/view-products", {
          title: "Shopping Cart",
          products,
          admin: false,
          cartCount,
        });
      })
      .catch((err) => {
        console.error("ERROR: " + err);
      });
  },

  getProduct: (req, res) => {
    productModel
      .getProduct()
      .then((products) => {
        res.render("admin/view-products", { products });
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
              res.render("admin/add-product", { admin: true, categorys });
              console.log("Product Added Successfully");
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

  deleteProduct: async (req, res) => {
    try {
      let productId = req.params.id;
      const product = await productModel.getOneProduct(productId);

      // image path
      const imagePath = path.join(
        __dirname,
        "..",
        "public",
        "uploads",
        product.image,
      );
      console.log(imagePath);

      // delete image from folder
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }

      const result = await productModel.deleteProduct(productId);
      console.log(result);

      res.redirect("/admin");
    } catch (err) {
      console.log(err);
    }
  },

  getEditPage: async (req, res) => {
    try {
      let productId = req.params.id;
      console.log(productId);

      const product = await productModel.getOneProduct(productId);
      res.render("admin/edit-product", { admin: true, categorys, product });
    } catch (err) {
      console.log(err);
    }
  },

  updateProduct: async (req, res) => {
    try {
      let productId = req.params.id;
      let { name, category, description, price } = req.body;

      console.log(name, category, description, price);
      let fileName = "";

      if (req.files && req.files.image) {
        let image = req.files.image;

        let ext = path.extname(image.name); // ".jpg"

        const uploadDir = path.join(__dirname, "..", "public", "uploads");

        const fileName = productId + ext;

        const filePath = path.join(uploadDir, fileName);

        await image.mv(filePath);
      }
      const updateData = {
        name,
        category,
        description,
        price,
      };

      console.log(updateData);

      if (fileName) {
        updateData.image = fileName;
      }

      await productModel.updateProduct(productId, updateData);
      console.log("Successfull");
    } catch (error) {
      console.log(error);
    }
  },

  searchProduct: async (req, res) => {
    try {
      const search = (req.query.search || "").trim();

      const products = await productModel.searchProduct(search);

      res.render("admin/view-products", { products });
    } catch (err) {
      console.log(err);
    }
  },
};
