const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const adminCheckMiddleware = require("../middlewares/adminCheckMiddleware");

router.get("/:id?", productController.getProducts);

router.post(
  "/",
  adminCheckMiddleware("api/productos/", "createProduct"),
  productController.createProduct
);

router.put(
  "/:id",
  adminCheckMiddleware("/api/productos/:id", "updateProduct"),
  productController.updateProduct
);

router.delete(
  "/:id",
  adminCheckMiddleware("/api/productos/:id", "deleteProduct"),
  productController.deleteProduct
);

module.exports = router;
