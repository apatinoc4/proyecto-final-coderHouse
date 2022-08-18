import admin from "firebase-admin";

export default class CartsFirebase {
  constructor(nombre) {
    const db = admin.firestore();
    this.nombre = nombre;
    this.collection = db.collection(this.nombre);
  }

  async save() {
    try {
      const templateObj = {
        timestamp: Date.now(),
        productos: [],
      };
      const cart = await this.collection.doc().set(templateObj);

      return cart;
    } catch (err) {
      console.log("Error en la creacion de carrito", "\n", err);
    }
  }

  async getAll() {
    try {
      const products = await this.collection.get();

      const docs = products.docs;

      const response = docs.map((doc) => ({
        id: doc.id,
        timestamp: doc.data().timestamp,
        productos: doc.data().productos,
      }));

      return response;
    } catch (err) {
      console.log("Error en la muestra de productos", "\n", err);
    }
  }

  async productsByCartId(id) {
    try {
      const doc = this.collection.doc(`${id}`);
      const foundCart = await doc.get();
      const response = foundCart.data().productos;

      if (response) {
        return response;
      }

      return null;
    } catch (err) {
      console.log("Error encontrando el carrito");
    }
  }

  async addCartProduct(cartId, product) {
    try {
      const doc = this.collection.doc(`${cartId}`);
      const response = doc.update({
        productos: admin.firestore.FieldValue.arrayUnion(product),
      });

      return response;
    } catch (err) {
      console.log("Error al agregar producto al carrito");
    }
  }

  async deleteCartProduct(cartId, product) {
    try {
      const doc = this.collection.doc(`${cartId}`);
      const response = doc.update({
        productos: admin.firestore.FieldValue.arrayRemove(product),
      });

      return response;
    } catch (err) {
      console.log("Error al aborrar producto del carrito");
    }
  }

  async deleteById(id) {
    try {
      const doc = this.collection.doc(`${id}`);
      const cartToDelete = await doc.delete();

      if (!cartToDelete) {
        return "carrito no encontrado";
      }
    } catch (err) {
      console.log(err);
    }
  }
}
