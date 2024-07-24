const fs = require("fs").promises;

class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];
    this.ultId = 0;

    this.loadCart();
  }

  //Crear dos metodos auxiliares para cargar y leer archivos.
  async loadCart() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      this.carts = JSON.parse(data);

      if (this.carts.length > 0) {
        //Verifico que exista un elemento creado.
        this.ultId = Math.max(...this.carts.map((cart) => cart.id));
        //Utilizo el método map para crear un nuevo array que solo tenga los id del carrito y con Math.max obtengo el mayor.
      }
    } catch (error) {
      console.log("Error al cargar los carritos desde el archivo", error);
    }
  }

  async saveCart() {
    await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
  }

  //Primer consigna crear el carrito:
  async createCart() {
    const newCart = {
      id: ++this.ultId,
      products: [],
    };
    this.carts.push(newCart);
    //Guardamos el array en el archivo:
    await this.saveCart();
    return newCart;
  }

  //Retorne un carrito por id:
  async getCartById(cartId) {
    try {
      const cart = this.carts.find((c) => c.id === cartld);

      if (!cart) {
        throw new Error("No existe un carrito con ese id");
      }
      return cart;
    } catch (error) {
      console.log("Error al obtener el carrito por id");
      throw error;
    }
  }

  // ingresar productos al carrito:
  async addCartId(cartld, productld, quantity = 1) {
    const cart = await this.getCartById(cartId);
    const existProduct = cart.products.find((p.product = productId));
    if (existProduct) {
      existProduct.quantity = quantity;
    } else {
      cart.products.push({ product: productld, quantity });
    }
    await this.saveCart();
    return cart;
  }
}
module.exports = CartManager;
