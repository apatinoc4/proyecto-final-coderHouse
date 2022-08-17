import { productsDao, carritosDao } from "../index.js";

const cartController = {
  getCarts: async (req, res) => {
    const cartArray = await carritosDao.getAll();

    return res.send(cartArray);
  },

  getCartProducts: async (req, res) => {
    const cartId = parseInt(req.params.id);
    const selectedCartProducts = await carritosDao.productsByCartId(cartId);

    return res.send(selectedCartProducts);
  },

  createCart: async (req, res) => {
    await carritosDao.save();

    const cartArray = await carritosDao.getAll();

    res.send(cartArray[cartArray.length - 1]);
  },

  addCartProduct: async (req, res) => {
    const cartId = parseInt(req.params.id);
    const prodId = parseInt(req.params.id_prod);
    const product = await productsDao.getById(prodId);

    await carritosDao.addCartProduct(cartId, product);

    const selectedCartProducts = await carritosDao.productsByCartId(cartId);

    res.send(selectedCartProducts);
  },

  deleteCartProduct: async (req, res) => {
    const cartId = parseInt(req.params.id);
    const prodId = parseInt(req.params.id_prod);

    await carritosDao.deleteCartProduct(cartId, prodId);

    const selectedCartProducts = await carritosDao.productsByCartId(cartId);

    res.send(selectedCartProducts);
  },

  deleteCart: async (req, res) => {
    const cartId = parseInt(req.params.id);

    await carritosDao.deleteById(cartId);

    return res.sendStatus(200);
  },
};

export default cartController;
