import fs from "fs";

export default class Contenedor {
  constructor(nombre) {
    this.nombre = nombre;
  }

  async save() {
    const templateObj = {
      timestamp: Date.now(),
      productos: [],
    };
    const stringifiedObj = JSON.stringify({ id: 1, ...templateObj });
    const fileExists = fs.existsSync(`./src/${this.nombre}`);

    if (!fileExists) {
      try {
        await fs.promises.writeFile(
          `./src/${this.nombre}`,
          `[${stringifiedObj}]`
        );

        return 1;
      } catch (err) {
        console.log("Error en la creacion del archivo!", "\n", err);
      }
    } else {
      try {
        const productArray = await fs.promises.readFile(
          `./src/${this.nombre}`,
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
          `./src/${this.nombre}`,
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
      const productArray = await fs.promises.readFile(
        `./src/${this.nombre}`,
        "utf-8"
      );
      const parsedProductArray = JSON.parse(productArray);
      const foundProduct = parsedProductArray.find(
        (product) => product.id === id
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
        `./src/${this.nombre}`,
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
      const cartArray = await fs.promises.readFile(
        `./src/${this.nombre}`,
        "utf-8"
      );
      const parsedCartArray = JSON.parse(cartArray);
      const selectedCart = parsedCartArray.find((elem) => elem.id === id);

      return selectedCart.productos;
    } catch (err) {
      console.log("Error encontrando el carrito");
    }
  }

  async addCartProduct(cartId, product) {
    try {
      const cartArray = await fs.promises.readFile(
        `./src/${this.nombre}`,
        "utf-8"
      );
      const parsedCartArray = JSON.parse(cartArray);
      const selectedCart = parsedCartArray.find((elem) => elem.id === cartId);

      selectedCart.productos.push(product);

      await fs.promises.writeFile(
        `./src/${this.nombre}`,
        JSON.stringify(parsedCartArray)
      );

      return selectedCart.productos;
    } catch (err) {
      console.log("Error al agregar producto al carrito");
    }
  }

  async deleteCartProduct(cartId, prodId) {
    try {
      const cartArray = await fs.promises.readFile(
        `./src/${this.nombre}`,
        "utf-8"
      );
      const parsedCartArray = JSON.parse(cartArray);
      const selectedCart = parsedCartArray.find((elem) => elem.id === cartId);

      const filteredProductArray = selectedCart.productos.filter(
        (elem) => elem.id !== prodId
      );

      selectedCart.productos.splice(
        0,
        selectedCart.productos.length,
        ...filteredProductArray
      );

      await fs.promises.writeFile(
        `./src/${this.nombre}`,
        JSON.stringify(parsedCartArray)
      );

      return selectedCart.productos;
    } catch (err) {
      console.log("Error al agregar producto al carrito");
    }
  }

  async deleteById(id) {
    try {
      const cartArray = await fs.promises.readFile(
        `./src/${this.nombre}`,
        "utf-8"
      );
      const parsedCartArray = JSON.parse(cartArray);

      const filteredCartArray = parsedCartArray.filter(
        (product) => product.id !== id
      );

      fs.promises.writeFile(
        `./src/${this.nombre}`,
        JSON.stringify(filteredCartArray)
      );
    } catch (err) {
      console.log(err);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(`./src/${this.nombre}`, "[]");
    } catch (err) {
      console.log(err);
    }
  }
}
