//Desarrollar un servidor express que, en su archivo app.js importe al archivo de productManager.

const express = require("express");
const app = express();
const PUERTO = 8080;
const productsRouter = require("./routers/products.router.js");
const cartsRouter = require("./routers/carts.router.js");
import exphbs from "express-handlebars";
import viewsRouter from "./routes/views.router.js";

//Middleware:
app.use(express.json());
//Le decimos al servidor que vamos a trabajar con JSON.

//Configuramos Express-Handlebars

app.engine("handlebars", exphbs.engine());
//Aca configuramos el motor de plantillas, le digo a experess que cuando encuentre un archivo con la extension .handlebars, lo renderice utilizando este motor.

app.set("view engine", "handlebars");
//Por ultimo, le decimos en donde se encuentran estos archivos con la extensión "handlebars"
app.set("views", "./src/views");

//Tus rutas
app.use("/", viewsRouter);

//Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

app.listen(PUERTO, () => {
  console.log(`Escuchando en el http://localhost:${PUERTO}`);
});
