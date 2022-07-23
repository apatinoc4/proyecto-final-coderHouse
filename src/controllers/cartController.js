const classCarritos = require("../classCarrito");
const cartFile = new classCarritos("carritos.txt");

const classProductos = require("../classContenedor");
const productsFile = new classProductos("productos.txt");

const cartController = {
  getCarts: async (req, res) => {
    const cartArray = await cartFile.getAll();

    return res.send(cartArray);
  },

  getCartProducts: async (req, res) => {
    const cartId = parseInt(req.params.id);
    const selectedCartProducts = await cartFile.productsByCartId(cartId);

    return res.send(selectedCartProducts);
  },

  createCart: async (req, res) => {
    await cartFile.save();

    const cartArray = await cartFile.getAll();

    res.send(cartArray[cartArray.length - 1]);
  },

  addCartProduct: async (req, res) => {
    const cartId = parseInt(req.params.id);
    const prodId = parseInt(req.params.id_prod);
    const product = await productsFile.getById(prodId);

    await cartFile.addCartProduct(cartId, product);

    const selectedCartProducts = await cartFile.productsByCartId(cartId);

    res.send(selectedCartProducts);
  },

  deleteCartProduct: async (req, res) => {
    const cartId = parseInt(req.params.id);
    const prodId = parseInt(req.params.id_prod);

    await cartFile.deleteCartProduct(cartId, prodId);

    const selectedCartProducts = await cartFile.productsByCartId(cartId);

    res.send(selectedCartProducts);
  },

  deleteCart: async (req, res) => {
    const cartId = parseInt(req.params.id);

    await cartFile.deleteById(cartId);

    return res.sendStatus(200);
  },
};

module.exports = cartController;
