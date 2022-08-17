import dotenv from "dotenv";
dotenv.config();

let productsDao;
let carritosDao;

switch (process.env.DAO) {
  case "mongoDB":
    const { default: ProductsMongoDB } = await import(
      "./daos/productos/productsMongoDB.js"
    );
    productsDao = new ProductsMongoDB("productos");
    break;

  case "file":
    const { default: ProductsFile } = await import(
      "./daos/productos/productsFile/productsFile.js"
    );
    const { default: CartsFile } = await import(
      "./daos/carritos/cartsFile/cartFile.js"
    );
    productsDao = new ProductsFile("productos.txt");
    carritosDao = new CartsFile("carritos.txt");
    break;
}

export { productsDao, carritosDao };
