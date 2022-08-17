import { productsDao } from "../index.js";

const productController = {
  getProducts: async (req, res) => {
    const arrayProductos = await productsDao.getAll();
    const productId = req.params.id;

    if (productId) {
      const foundProduct = await productsDao.getById(productId);

      if (foundProduct) {
        return res.send(foundProduct);
      } else {
        return res.send({ error: "producto no encontrado" });
      }
    }

    return res.send(arrayProductos);
  },

  createProduct: async (req, res) => {
    const newProduct = { ...req.body, timestamp: Date.now() };

    await productsDao.save(newProduct);

    const arrayProductos = await productsDao.getAll();

    return res.send(arrayProductos[arrayProductos.length - 1]);
  },

  deleteProduct: async (req, res) => {
    const productId = req.params.id;

    await productsDao.deleteById(productId);

    return res.sendStatus(200);
  },

  updateProduct: async (req, res) => {
    const productId = req.params.id;

    await productsDao.updateById(productId, req.body);

    return res.sendStatus(200);
  },
};

export default productController;
