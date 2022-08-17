import mongoose from "mongoose";
import config from "../../config.js";

export default class CartsMongoDB {
  constructor(nombre) {
    this.nombre = nombre;
    this.mongoose = mongoose
      .connect(config.mongodb.cnxStr, config.mongodb.options)
      .catch((err) => {
        console.log(err);
        process.exit(1);
      });

    const cartSchema = new mongoose.Schema({
      productos: { type: Array, required: true },
      timestamp: { type: Date, default: Date.now },
      codigo: { type: String, required: true, unique: true },
    });

    this.model = mongoose.model(this.nombre, cartSchema);
  }

  async save() {
    try {
      //todo figure out unique not in schema issue

      let r = (Math.random() + 1).toString(36).substring(7);
      const templateObj = {
        timestamp: Date.now(),
        productos: [],
        codigo: r,
      };
      const cart = await this.model.create(templateObj);

      return cart;
    } catch (err) {
      console.log("Error en la creacion de carrito", "\n", err);
    }
  }

  async getAll() {
    try {
      const carts = await this.model.find({});

      return carts;
    } catch (err) {
      console.log("Error en la muestra de productos", "\n", err);
    }
  }

  async getById(id) {
    try {
      const foundCart = await this.model.findOne({ _id: id });

      if (foundCart) {
        return foundCart;
      }

      return null;
    } catch (err) {
      console.log("Error en la busqueda", "\n", err);
    }
  }

  async productsByCartId(id) {
    try {
      const foundCartProducts = await this.model
        .findOne({ _id: id })
        .select("productos");

      return foundCartProducts;
    } catch (err) {
      console.log("Error encontrando el carrito");
    }
  }

  async addCartProduct(cartId, product) {
    try {
      await this.model.findOneAndUpdate(
        { _id: cartId },
        { $push: { productos: product } }
      );

      const foundCartProducts = await this.model
        .findOne({ _id: cartId })
        .select("productos");

      return foundCartProducts;
    } catch (err) {
      console.log("Error al agregar producto al carrito");
    }
  }

  async deleteCartProduct(cartId, product) {
    try {
      await this.model.findOneAndUpdate(
        { _id: cartId },
        { $pull: { productos: product } }
      );
    } catch (err) {
      console.log("Error al aborrar producto del carrito");
    }
  }

  async deleteById(id) {
    try {
      const cartToDelete = await this.model.findOneAndDelete({ _id: id });

      if (!cartToDelete) {
        return "carrito no encontrado";
      }
    } catch (err) {
      console.log(err);
    }
  }
}
