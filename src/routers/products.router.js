const express = require("express");
const ProductManager = require("../managers/product-manager.js");
const manager = new ProductManager("../src/data/products.json");
const router = express.Router();

//Rutas

//Listar todos los productos:
//http://localhost:8080/api/products?limit=2

router.get("/", async (req, res) => {
  const limit = req.query.limit;
  try {
    const arrayProductos = await manager.getProducts();
    if (limit) {
      res.send(arrayProductos.slice(0, limit));
    } else {
      res.send(arrayProductos);
    }
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
});

//Buscar producto por id:

router.get("/:pid", async (req, res) => {
  let id = req.params.pid;
  try {
    const producto = await manager.getProductById(parseInt(id));

    if (!producto) {
      res.send("Producto no encontrado");
    } else {
      res.send(producto);
    }
  } catch (error) {
    res.send("Error al buscar ese id en los productos");
  }
});

//Agregar nuevo producto:

router.post("/", async (req, res) => {
  const nuevoProducto = req.body;

  try {
    await manager.addProduct(nuevoProducto);

    res.status(201).send("Producto agregado exitosamente");
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

//Buscar producto por id:

router.get("/:pid", async (req, res) => {
  let id = req.params.pid;
  try {
    const product = await manager.getProductById(parseInt(id));

    if (!product) {
      res.send("Producto no encontrado");
    } else {
      res.send(product);
    }
  } catch (error) {
    res.send("Error al buscar ese id en los productos");
  }
});

//Fuente de datos:

const clientes = [
  { id: "1", nombre: "Luke", apellido: "Skywalker" },
  { id: "2", nombre: "Leia", apellido: "Organa" },
  { id: "3", nombre: "Han", apellido: "Solo" },
  { id: "4", nombre: "Chewbacca", apellido: "" },
  { id: "5", nombre: "Darth", apellido: "Vader" },
  { id: "6", nombre: "Yoda", apellido: "" },
  { id: "7", nombre: "R2-D2", apellido: "" },
  { id: "8", nombre: "C-3PO", apellido: "" },
  { id: "9", nombre: "Padmé", apellido: "Amidala" },
  { id: "10", nombre: "Anakin", apellido: "Skywalker" },
];

//Metodo GET, me permite obtener registros:

router.get("/", (req, res) => {
  res.send(clientes);
});

//Metodo GET, recupero un cliente por id:

router.get("/:id", (req, res) => {
  let id = req.params.id;
  let clienteBuscado = clientes.find((cliente) => cliente.id === id);

  if (clienteBuscado) {
    return res.send(clienteBuscado);
  } else {
    return res.send("No se encuentra el cliente con el ID proporcionado");
  }
});

//Metodo POST, me permite enviar registros

router.post("/", (req, res) => {
  const clienteNuevo = req.body;
  //Recupero el dato que me envia el cliente desde un formulario. Todo esto viaja en el objeto request, propiedad body.

  clientes.push(clienteNuevo);
  //Agrego el nuevo cliente al array.

  console.log(clientes);

  res.send({ status: "success", message: "Cliente creado" });
});

//Metodo PUT, me permite actualizar un registro.

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, apellido } = req.body;

  //Tengo que buscar el indice que corresponde a este ID:
  let clienteIndex = clientes.findIndex((cliente) => cliente.id === id);

  if (clienteIndex !== -1) {
    //Si el cliente existe, actualizo sus datos:
    clientes[clienteIndex].nombre = nombre;
    clientes[clienteIndex].apellido = apellido;

    res.send({ status: "success", message: "cliente actualizado" });
  } else {
    res.status(404).send({ status: "error", message: "Cliente no encontrado" });
  }
});

//Metodo DELETE, eliminamos a TinkiWinki:

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  //Tengo que buscar el indice que corresponde a este ID:
  let clienteIndex = clientes.findIndex((cliente) => cliente.id === id);

  if (clienteIndex !== -1) {
    //Si el cliente existe, lo elimino del array:
    clientes.splice(clienteIndex, 1);
    console.log(clientes);

    res.send({ status: "success", message: "cliente eliminado" });
  } else {
    res.status(404).send({ status: "error", message: "Cliente no encontrado" });
  }
});

module.exports = router;
