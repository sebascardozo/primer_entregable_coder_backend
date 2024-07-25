const express = require("express");
const router = express.Router();
const CartManager = require("../managers/cart-manager.js");
const cartManager = new CartManager("./src/data/carts.json");

//1) Ruta post que cree un carrito nuevo.

router.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.json(newCart);
  } catch (error) {
    res.status(500).send("Error del servidor");
  }
});

//2) Listamos los productos de determinado carrito:

router.get("/:cid", async (req, res) => {
  let carritoId = parseInt(req.params.cid);

  try {
    const carrito = await cartManager.getCartById(cartId);
    res.json(cart.products);
  } catch (error) {
    res.status(500).send("Error al obtener los productos del carrito");
  }
});

//3) Agregar productos al carrito
router.post("/:cid/product/:pid", async (req, res) => {
  let cartId = parseInt(req.params.cid);
  let productId = req.params.pid;
  let quantity = req.body.quantity || 1;

  try {
    const actualizado = await cartManager.addProductCart(
      cartId,
      productId,
      quantity
    );
    res.json(actualizado.products);
  } catch (error) {
    res.status(500).send("Error al agregar un producto, moriremos");
  }
});

module.exports = router;
