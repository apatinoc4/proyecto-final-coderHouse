import dotenv from "dotenv";
dotenv.config();

let productsDao;
let carritosDao;

switch (process.env.DAO) {
  case "mongoDB":
    const { default: ProductsMongoDB } = await import(
      "./daos/productos/productsMongoDB.js"
    );
    const { default: CartsMongoDB } = await import(
      "./daos/carritos/cartsMongoDB.js"
    );
    productsDao = new ProductsMongoDB("productos");
    carritosDao = new CartsMongoDB("carritos");
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

  case "firebase":
    const { default: ProductsFirebase } = await import(
      "./daos/productos/productsFirebase.js"
    );
    // const { default: CartsFile } = await import(
    //   "./daos/carritos/cartsFile/cartFile.js"
    // );
    productsDao = new ProductsFirebase("productos");
    // carritosDao = new CartsFile("carritos.txt");
    break;
}

export { productsDao, carritosDao };
