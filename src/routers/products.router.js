const express = require("express");
const router = express.Router();
const ProductManager = require("../managers/product-manager.js");
const manager = new ProductManager("./src/data/products.json");

//Listar todos los productos:

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

module.exports = router;
