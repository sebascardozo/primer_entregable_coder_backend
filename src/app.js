//Desarrollar un servidor express que, en su archivo app.js importe al archivo de productManager.

const express = require("express");
const app = express();
const PUERTO = 8080;
const productsRouter = require("./routers/products.router.js");
const cartsRouter = require("./routers/carts.router.js");
const viewsRouter = require("./routers/views.router.js");
const { engine } = require("express-handlebars");
const { Server } = require("socket.io");
const socket = require("socket.io");

//Middleware:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

//Configuramos Express-Handlebars

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

//Referencia al servidor
const httpServer = app.listen(PUERTO, () => {
  console.log(`Escuchando en el http://localhost:${PUERTO}`);
});

//Instancio el Socket Server y por convencion la guardo en la contante io
const io = socket(httpServer);

const ProductManager = require("./managers/product-manager.js");
const manager = new ProductManager("./src/data/products.json");

//Comandos desde el BackEnd
io.on("connection", async (socket) => {
  socket.on("message", (data) => {
    console.log(`Nuevo cliente ${data}`);
  });

  // Enviar productos al front
  socket.emit("productos", await manager.getProducts());

  //Recibo el Id del producto de front y lo elimino
  socket.on("deleteProduct", async (productId) => {
    console.log("Id recibido", productId);
    ProductManager.deleteProduct(productId);
    socket.emit("products", await ProductManager.getProducts());
    console.log("Productos actualizados");
  });

  // Manejar adición de productos desde el formulario
  socket.on("productForm", async (data) => {
    try {
      const {
        title,
        description,
        price,
        code,
        stock,
        category,
        status = true,
      } = data;
      await manager.addProduct({
        title,
        description,
        price,
        code,
        stock,
        category,
      });
      io.emit("productos", await manager.getProducts());
      console.log("Producto añadido y productos actualizados");
    } catch (error) {
      console.error("Error al añadir el producto:", error);
    }
  });
});
