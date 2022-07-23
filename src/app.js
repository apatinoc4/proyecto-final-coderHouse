const express = require("express");

const path = require("path");
const bodyParser = require("body-parser");

const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, "../public")));

const PORT = 8080;

const server = app.listen(process.env.PORT || PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));

app.get("/", (req, res) => {
  res.send("Ingresa a /productos o /productoRandom !");
});

app.use("/api/productos", productRoutes);
app.use("/api/carrito", cartRoutes);
