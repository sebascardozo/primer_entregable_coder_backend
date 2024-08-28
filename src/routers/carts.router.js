const express = require("express");
const router = express.Router();
const cartManager = require("../dao/db/cart-manager-db.js");
const cartManager = new cartManager("./src/data/carts.json");

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
  let cartId = parseInt(req.params.cid);

  try {
    const cart = await cartManager.getCartById(cartId);
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
    const upDated = await cartManager.addProductCart(
      cartId,
      productId,
      quantity
    );
    res.json(upDated.products);
  } catch (error) {
    res.status(500).send("Error al agregar un producto, moriremos");
  }
});

//actualizar la cantidad de un producto en un  carrito

router.put("/:cid/products/:pid", async (req, res) => {
  let cartId = req.params.cid;
  let productId = req.params.pid;
  let newQuantity = req.body.quantity;

  if (!newQuantity || newQuantity <= 0) {
    return res.status(400).send("Cantidad inválida");
  }
  try {
    const cart = await cartManager.getCarritoById(cartId);
    if (!cart) {
      return res.status(404).send("Carrito no encontrado");
    }
    const existProduct = cart.products.find(
      (item) => item.product.toString() === productId
    );
    if (existeProducto) {
      existProduct.quantity = newQuantity;
      cart.markModified("products");
      await cart.save();
      res.json(cart.products);
    } else {
      res.status(404).send("Producto no encontrado en el carrito");
    }
  } catch (error) {
    console.error(
      "Error al actualizar la cantidad del producto en el carrito:",
      error.message
    );
    res.status(500).send("Error del servidor");
  }
});

// Vaciar el carrito
router.delete("/:cid", async (req, res) => {
  let cartId = req.params.cid;

  try {
    const cart = await cartManager.getCartById(cartId);
    if (!cart) {
      return res.status(404).send("Carrito no encontrado");
    }
    cart.products = [];
    cart.markModified("products");
    await cart.save();

    res.json({ message: "Carrito vacío exitosamente", carrito });
  } catch (error) {
    console.error("Error al vaciar el carrito:", error.message);
    res.status(500).send("Error del servidor");
  }
});

module.exports = router;
