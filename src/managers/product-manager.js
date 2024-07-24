const fs = require("fs").promises;

class ProductManager {
  static ultId = 0;

  constructor(path) {
    this.products = [];
    this.path = path;
  }

  async addProduct({ title, description, price, img, code, stock }) {
    if (!title || !description || !price || !img || !code || !stock) {
      console.log("Todos los campos son obligatorios");
      return;
    }

    //2) Validacion:

    if (this.products.some((item) => item.code === code)) {
      console.log(
        "El codigo debe ser unico.. o el tutor te hace la desaprobacion"
      );
      return;
    }

    //3) Crear el producto, pero que tenga el id autoincrementable.
    const newProduct = {
      id: ++ProductManager.ultId,
      title,
      description,
      price,
      img,
      code,
      stock,
    };

    //4) Metemos el producto al array.
    this.products.push(newProduct);

    //5) Lo guardamos en el archivo:
    await this.saveProduct(this.products);
  }

  async getProducts() {
    try {
      const arrayProductos = await this.readFile();
      return arrayProductos;
    } catch (error) {
      console.log("Error al leer el archivo", error);
    }
  }

  async getProductById(id) {
    try {
      const arrayProductos = await this.readFile();
      const buscado = arrayProductos.find((item) => item.id === id);

      if (!buscado) {
        console.log("producto no encontrado");
        return null;
      } else {
        console.log("Producto encontrado");
        return buscado;
      }
    } catch (error) {
      console.log("Error al buscar por id", error);
    }
  }

  //Métodos auxiliares:
  async readFile() {
    const respuesta = await fs.readFile(this.path, "utf-8");
    const arrayProductos = JSON.parse(respuesta);
    return arrayProductos;
  }

  async saveFile(arrayProductos) {
    await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
  }

  //Método para actualizar productos:

  async updateProduct(id, productoActualizado) {
    try {
      const arrayProductos = await this.readFile();

      const index = arrayProductos.findIndex((item) => item.id === id);

      if (index !== -1) {
        arrayProductos[index] = {
          ...arrayProductos[index],
          ...productoActualizado,
        };
        await this.saveFile(arrayProductos);
        console.log("Producto actualizado");
      } else {
        console.log("No se encuentra el producto");
      }
    } catch (error) {
      console.log("Tenemos un error al actualizar productos");
    }
  }

  async deleteProduct(id) {
    try {
      const arrayProductos = await this.readFile();

      const index = arrayProductos.findIndex((item) => item.id === id);

      if (index !== -1) {
        arrayProductos.splice(index, 1);
        await this.saveFile(arrayProductos);
        console.log("Producto eliminado");
      } else {
        console.log("No se encuentra el producto");
      }
    } catch (error) {
      console.log("Tenemos un error al eliminar productos");
    }
  }
}

module.exports = ProductManager;
