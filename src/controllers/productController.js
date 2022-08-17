import classProductos from "../classContenedor.js";
const productsFile = new classProductos("productos.txt");

const productController = {
  getProducts: async (req, res) => {
    const arrayProductos = await productsFile.getAll();
    const productId = parseInt(req.params.id);

    if (productId) {
      const foundProduct = await productsFile.getById(productId);

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

    await productsFile.save(newProduct);

    const arrayProductos = await productsFile.getAll();

    return res.send(arrayProductos[arrayProductos.length - 1]);
  },

  deleteProduct: async (req, res) => {
    const productId = parseInt(req.params.id);

    await productsFile.deleteById(productId);

    return res.sendStatus(200);
  },

  updateProduct: async (req, res) => {
    const productId = parseInt(req.params.id);

    await productsFile.updateById(productId, req.body);

    return res.sendStatus(200);
  },
};

export default productController;
