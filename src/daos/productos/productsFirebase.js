import admin from "firebase-admin";
import fs from "fs";

export default class ProductsFirebase {
  constructor(nombre) {
    const serviceAccount = JSON.parse(
      fs.readFileSync(
        "./src/firebase/entregafinalandresp-firebase-adminsdk-krbn8-b91f46c47d.json"
      )
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    const db = admin.firestore();
    this.nombre = nombre;
    this.collection = db.collection(this.nombre);
  }

  async save(object) {
    try {
      const product = await this.collection.doc().set(object);

      return product;
    } catch (err) {
      console.log("Error en la creacion de producto", "\n", err);
    }
  }

  async getAll() {
    try {
      const products = await this.collection.get();

      const docs = products.docs;

      const response = docs.map((doc) => ({
        id: doc.id,
        codigo: doc.data().codigo,
        nombre: doc.data().nombre,
        descripcion: doc.data().descripcion,
        foto: doc.data().foto,
        timestamp: doc.data().timestamp,
        precio: doc.data().precio,
        stock: doc.data().stock,
      }));

      return response;
    } catch (err) {
      console.log("Error en la muestra de productos", "\n", err);
    }
  }

  async getById(id) {
    try {
      const doc = this.collection.doc(`${id}`);
      const foundProduct = await doc.get();
      const response = foundProduct.data();

      if (response) {
        return response;
      }

      return null;
    } catch (err) {
      console.log("Error en la busqueda", "\n", err);
    }
  }

  async updateById(id, obj) {
    try {
      const doc = this.collection.doc(`${id}`);
      const updatedProduct = await doc.update(obj);

      if (!doc) {
        return { error: "producto no encontrado" };
      }

      return updatedProduct;
    } catch (err) {
      console.log("Error en la actualizacion de producto", "\n", err);
    }
  }

  async deleteById(id) {
    try {
      const doc = this.collection.doc(`${id}`);
      const productToDelete = await doc.delete();

      if (!productToDelete) {
        return "producto no encontrado";
      }
    } catch (err) {
      console.log(err);
    }
  }
}
