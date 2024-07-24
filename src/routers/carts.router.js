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
}
nodule.exports = CantManager;
