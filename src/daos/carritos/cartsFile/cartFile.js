import fs from "fs";

export default class CartsFile {
  constructor(nombre) {
    this.nombre = nombre;
  }

  async save() {
    const templateObj = {
      timestamp: Date.now(),
      productos: [],
    };
    const stringifiedObj = JSON.stringify({ id: 1, ...templateObj });
    const fileExists = fs.existsSync(
      `./src/daos/carritos/cartsFile/${this.nombre}`
    );

    if (!fileExists) {
      try {
        await fs.promises.writeFile(
          `./src/daos/carritos/cartsFile/${this.nombre}`,
          `[${stringifiedObj}]`
        );

        return 1;
      } catch (err) {
        console.log("Error en la creacion del archivo!", "\n", err);
      }
    } else {
      try {
        const productArray = await fs.promises.readFile(
          `./src/daos/carritos/cartsFile/${this.nombre}`,
          "utf-8"
        );
        const parsedCartArray = JSON.parse(productArray);

        parsedCartArray.push({
          id:
            parsedCartArray.length === 0
              ? 1
              : parsedCartArray[parsedCartArray.length - 1].id + 1,
          ...templateObj,
        });

        await fs.promises.writeFile(
          `./src/daos/carritos/cartsFile/${this.nombre}`,
          JSON.stringify(parsedCartArray)
        );

        return parsedCartArray.length === 0
          ? 1
          : parsedCartArray[parsedCartArray.length - 1].id;
      } catch (err) {
        console.log("Error en la modificacion del archivo!", "\n", err);
      }
    }
  }

  async getById(id) {
    try {
      const intId = parseInt(id);
      const productArray = await fs.promises.readFile(
        `./src/daos/carritos/cartsFile/${this.nombre}`,
        "utf-8"
      );
      const parsedProductArray = JSON.parse(productArray);
      const foundProduct = parsedProductArray.find(
        (product) => product.id === intId
      );

      if (foundProduct) {
        return foundProduct;
      }

      return null;
    } catch (err) {
      console.log("Error en la busqueda", "\n", err);
    }
  }

  async getAll() {
    try {
      const cartArray = await fs.promises.readFile(
        `./src/daos/carritos/cartsFile/${this.nombre}`,
        "utf-8"
      );
      const parsedCartArray = JSON.parse(cartArray);

      return parsedCartArray;
    } catch (err) {
      console.log("Error en la muestra de productos", "\n", err);
    }
  }

  async productsByCartId(id) {
    try {
      const intId = parseInt(id);
      const cartArray = await fs.promises.readFile(
        `./src/daos/carritos/cartsFile/${this.nombre}`,
        "utf-8"
      );
      const parsedCartArray = JSON.parse(cartArray);
      const selectedCart = parsedCartArray.find((elem) => elem.id === intId);

      return selectedCart.productos;
    } catch (err) {
      console.log("Error encontrando el carrito");
    }
  }

  async addCartProduct(id, product) {
    try {
      const intCartId = parseInt(id);
      const cartArray = await fs.promises.readFile(
        `./src/daos/carritos/cartsFile/${this.nombre}`,
        "utf-8"
      );
      const parsedCartArray = JSON.parse(cartArray);
      const selectedCart = parsedCartArray.find(
        (elem) => elem.id === intCartId
      );

      selectedCart.productos.push(product);

      await fs.promises.writeFile(
        `./src/daos/carritos/cartsFile/${this.nombre}`,
        JSON.stringify(parsedCartArray)
      );

      return selectedCart.productos;
    } catch (err) {
      console.log("Error al agregar producto al carrito");
    }
  }

  async deleteCartProduct(cartId, prodId) {
    try {
      const intCartId = parseInt(cartId);
      const intProdId = parseInt(prodId);
      const cartArray = await fs.promises.readFile(
        `./src/daos/carritos/cartsFile/${this.nombre}`,
        "utf-8"
      );
      const parsedCartArray = JSON.parse(cartArray);
      const selectedCart = parsedCartArray.find(
        (elem) => elem.id === intCartId
      );

      const filteredProductArray = selectedCart.productos.filter(
        (elem) => elem.id !== intProdId
      );

      selectedCart.productos.splice(
        0,
        selectedCart.productos.length,
        ...filteredProductArray
      );

      await fs.promises.writeFile(
        `./src/daos/carritos/cartsFile/${this.nombre}`,
        JSON.stringify(parsedCartArray)
      );

      return selectedCart.productos;
    } catch (err) {
      console.log("Error al borrar producto del carrito");
    }
  }

  async deleteById(id) {
    try {
      const intId = parseInt(id);
      const cartArray = await fs.promises.readFile(
        `./src/daos/carritos/cartsFile/${this.nombre}`,
        "utf-8"
      );
      const parsedCartArray = JSON.parse(cartArray);

      const filteredCartArray = parsedCartArray.filter(
        (product) => product.id !== intId
      );

      fs.promises.writeFile(
        `./src/daos/carritos/cartsFile/${this.nombre}`,
        JSON.stringify(filteredCartArray)
      );
    } catch (err) {
      console.log(err);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(
        `./src/daos/carritos/cartsFile/${this.nombre}`,
        "[]"
      );
    } catch (err) {
      console.log(err);
    }
  }
}
