const { error } = require("console");
const e = require("express");
const CartModel = require("../models/cart.model.js");

class CartManager {
  async createCart() {
    try {
      const newCart = new CartModel({ products: [] });
      await newCart.save();
      return newCart;
    } catch (error) {
      console.log("error al crear un nuevo carrito");
    }
  }

  //Retorne un carrito por id:

  async getCartById(carritoId) {
    try {
      const cart = this.carts.find((c) => c.id === cartId);

      if (!cart) {
        throw new Error("No existe un carrito con ese id");
      }

      return cart;
    } catch (error) {
      console.log("Error al obtener el carrito por id");
      throw error;
    }
  }

  //Agregar productos al carrito:

  async addProductCart(cartId, productId, quantity = 1) {
    try {
      const cart = await this.getCartById(cartId);
      const existeProducto = cart.products.find((p) => p.product === productId);

      if (existeProducto) {
        existeProducto.quantity += quantity;
      } else {
        cart.products.push({ product: productoId, quantity });
      }
      carrito.markModified("products");
      await this.saveCart();
      return cart;
    } catch (error) {
      console.log("error al Agregar producto al carrito");
      throw error;
    }
  }
}
module.exports = CartManager;
