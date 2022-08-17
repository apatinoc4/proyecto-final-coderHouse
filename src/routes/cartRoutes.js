import { Router } from "express";
import cartController from "../controllers/cartController.js";

const cartRoutes = new Router();

cartRoutes.get("/", cartController.getCarts);

cartRoutes.get("/:id/productos", cartController.getCartProducts);

cartRoutes.post("/", cartController.createCart);

cartRoutes.post("/:id/productos/:id_prod", cartController.addCartProduct);

cartRoutes.delete("/:id/productos/:id_prod", cartController.deleteCartProduct);

cartRoutes.delete("/:id", cartController.deleteCart);

export default cartRoutes;
