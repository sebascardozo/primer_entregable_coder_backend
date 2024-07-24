//Desarrollar un servidor express que, en su archivo app.js importe al archivo de productManager.

const express = require("express");
const app = express();
const PUERTO = 8080;
const productsRouter = require("./routers/products.router.js");
const cartsRouter = require("./routers/carts.router.js");

//Middleware:
app.use(express.json());
//Le decimos al servidor que vamos a trabajar con JSON.

//Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(PUERTO, () => {
  console.log(`Escuchando en el http://localhost:${PUERTO}`);
});
