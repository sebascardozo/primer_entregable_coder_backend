const express = require("express");
const router = express.Router();
const productManager = require("../dao/db/product-manager-db.js");
const manager = new productManager("./src/data/products.json");

//Listar todos los productos:

router.get("/", async (req, res) => {
  const arrayProducts = await manager.getProducts();
  res.send(arrayProducts);
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

//Metodo Post para transferir informacion
router.post("/", async (req, res) => {
  try {
    const { title, description, price, img, code, stock } = req.body;
    const response = await ProductManager.updateProduct([
      title,
      description,
      price,
      img,
      code,
      stock,
    ]);
    res.json(response);
  } catch (error) {
    res.send("Error al crear producto");
    console.log(error);
  }
});

//Metodo Delete para eliminar productos

router.delete("/:pid", async (req, res) => {
  let pid = req.params.pid;
  try {
    await ProductManager.deleteProduct(pid);
    res.send("Producto Eliminado");
  } catch (error) {
    res.send("Error al eliminar producto");
    console.log(error);
  }
});

//Metodo para Actualizar un producto en la lista const newProduct = {

router.put("/:pid", async (req, res) => {
  const pid = req.params.pid;
  try {
    const { title, description, price, img, code, stock } = req.body;

    const response = await ProductManager.updateProduct(pid, {
      title,
      description,
      price,
      img,
      code,
      stock,
    });
    res.json(response);
  } catch (error) {
    res.send("Error al actualizar producto");
    console.log(error);
  }
});

module.exports = router;
