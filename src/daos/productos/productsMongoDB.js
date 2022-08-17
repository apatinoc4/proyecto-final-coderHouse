import mongoose from "mongoose";
import config from "../../config.js";

export default class ProductsMongoDB {
  constructor(nombre) {
    this.nombre = nombre;
    this.mongoose = mongoose
      .connect(config.mongodb.cnxStr, config.mongodb.options)
      .catch((err) => {
        console.log(err);
        process.exit(1);
      });

    const productSchema = new mongoose.Schema({
      nombre: { type: String, required: true },
      descripcion: { type: String, required: true },
      codigo: { type: String, required: true, unique: true },
      foto: { type: String, required: true },
      precio: { type: Number, required: true },
      stock: { type: Number, required: true },
      timestamp: { type: Date, default: Date.now },
    });

    this.model = mongoose.model(this.nombre, productSchema);
  }

  async save(object) {
    try {
      const product = await this.model.create(object);

      return product;
    } catch (err) {
      console.log("Error en la creacion de producto", "\n", err);
    }
  }

  async getAll() {
    try {
      const products = await this.model.find({});

      return products;
    } catch (err) {
      console.log("Error en la muestra de productos", "\n", err);
    }
  }

  async getById(id) {
    try {
      const foundProduct = await this.model.findOne({ _id: id });

      if (foundProduct) {
        return foundProduct;
      }

      return null;
    } catch (err) {
      console.log("Error en la busqueda", "\n", err);
    }
  }

  async updateById(id, obj) {
    try {
      const updatedProduct = await this.model.updateOne({ _id: id }, obj);

      const foundProduct = await this.model.findOne({ _id: id });

      if (!foundProduct) {
        return { error: "producto no encontrado" };
      }

      return updatedProduct;
    } catch (err) {
      console.log("Error en la actualizacion de producto", "\n", err);
    }
  }

  async deleteById(id) {
    try {
      const productToDelete = await this.model.findOneAndDelete({ _id: id });

      if (!productToDelete) {
        return "producto no encontrado";
      }
    } catch (err) {
      console.log(err);
    }
  }
}
