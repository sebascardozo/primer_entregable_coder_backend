const fs = require("fs").promises;

class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];
    this.ultId = 0;

    //Cargar los carritos almacenados en el archivo:
    this.upCarts();
  }

  //Crear dos metodos auxiliares para cargar y leer archivos.

  async upCarts() {
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
      //Si no existe el archivo, lo voy a crear.
      await this.saveCart();
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
    const cart = await this.getCartById(cartId);
    const existeProducto = cart.products.find((p) => p.product === productId);

    if (existeProducto) {
      existeProducto.quantity += quantity;
    } else {
      cart.products.push({ product: productoId, quantity });
    }

    await this.saveCart();
    return cart;
  }
}

module.exports = CartManager;
