const express = require("express");
const router = express.Router();
const ProductManager = require("../managers/product-manager.js");
const manager = new ProductManager("./src/data/products.json");

//Listar todos los productos:

router.get("/", async (req, res) => {
  const limit = req.query.limit;
  try {
    const arrayProducts = await manager.getProducts();
    if (limit) {
      res.send(arrayProducts.slice(0, limit));
    } else {
      res.send(arrayProducts);
    }
  } catch (error) {
    res.status(500).send("Error interno del servidor");
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

module.exports = router;
