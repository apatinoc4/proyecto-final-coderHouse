import { Router } from "express";
import productController from "../controllers/productController.js";
import adminCheckMiddleware from "../middlewares/adminCheckMiddleware.js";

const productRoutes = new Router();

productRoutes.get("/:id?", productController.getProducts);

productRoutes.post(
  "/",
  adminCheckMiddleware("api/productos/", "createProduct"),
  productController.createProduct
);

productRoutes.put(
  "/:id",
  adminCheckMiddleware("/api/productos/:id", "updateProduct"),
  productController.updateProduct
);

productRoutes.delete(
  "/:id",
  adminCheckMiddleware("/api/productos/:id", "deleteProduct"),
  productController.deleteProduct
);

export default productRoutes;
