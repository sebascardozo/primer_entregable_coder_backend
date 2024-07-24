const express = require("express");
const ProductManager = require("../managers/product-manager.js");
const manager = new ProductManager("./src/data/products.json");
const router = express.Router();

//Rutas

//Listar todos los productos:

router.get("/products", async (req, res) => {
  const arrayProductos = await manager.getProducts();
  res.send(arrayProductos);
});

//Buscar producto por id:

router.get("/products/:pid", async (req, res) => {
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

app.get("/clientes", (req, res) => {
  res.send(clientes);
});

//Metodo GET, recupero un cliente por id:

app.get("/clientes/:id", (req, res) => {
  let id = req.params.id;
  let clienteBuscado = clientes.find((cliente) => cliente.id === id);

  if (clienteBuscado) {
    return res.send(clienteBuscado);
  } else {
    return res.send("No se encuentra el cliente con el ID proporcionado");
  }
});

//Metodo POST, me permite enviar registros

app.post("/clientes", (req, res) => {
  const clienteNuevo = req.body;
  //Recupero el dato que me envia el cliente desde un formulario. Todo esto viaja en el objeto request, propiedad body.

  clientes.push(clienteNuevo);
  //Agrego el nuevo cliente al array.

  console.log(clientes);

  res.send({ status: "success", message: "Cliente creado" });
});

//Metodo PUT, me permite actualizar un registro.

app.put("/clientes/:id", (req, res) => {
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

app.delete("/clientes/:id", (req, res) => {
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
