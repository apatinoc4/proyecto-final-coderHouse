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
    });

    this.model = mongoose.model(this.nombre, productSchema);
  }

  async getAll() {
    try {
      const products = this.model.find({});

      return products;
    } catch (err) {
      console.log("Error en la muestra de productos", "\n", err);
    }
  }
}
