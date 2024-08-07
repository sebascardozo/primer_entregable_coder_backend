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
//Le decimos al servidor que vamos a trabajar con JSON.

//Configuramos Express-Handlebars

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
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

const httpServer = app.listen(PUERTO, () => {
  console.log(`Escuchando en el http://localhost:${PUERTO}`);
});

const io = socket(httpServer);

const ProductManager = require("./managers/product-manager.js");
const manager = new ProductManager("./src/data/productos.json");

io.on("connection", async (socket) => {
  console.log("Un cliente se conectó");

  // Enviar productos al cliente conectado
  socket.emit("productos", await manager.getProducts());

  // Manejar eliminación de productos
  socket.on("eliminarProducto", async (id) => {
    try {
      await manager.deleteProduct(id);
      io.emit("productos", await manager.getProducts());
      console.log("Producto eliminado y productos actualizados");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
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
