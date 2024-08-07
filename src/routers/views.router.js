const { Router } = require("express");
const ProductManager = require("../managers/product-manager.js");
const viewsRouter = Router();
const router = Router();

//Lista de todos los productos en la ruta /products
router.get("/products", async (req, res) => {
  const products = await manager.getProducts();

  res.render("home", { products });
});

router.get("/realtimeproducts", async (req, res) => {
  res.render("realtimeProducts");
});
module.exports = viewsRouter;
