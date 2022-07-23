const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/", cartController.getCarts);

router.get("/:id/productos", cartController.getCartProducts);

router.post("/", cartController.createCart);

router.post("/:id/productos/:id_prod", cartController.addCartProduct);

router.delete("/:id/productos/:id_prod", cartController.deleteCartProduct);

router.delete("/:id", cartController.deleteCart);

module.exports = router;
