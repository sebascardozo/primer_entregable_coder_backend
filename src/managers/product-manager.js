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
      console.log("El codigo debe ser unico");
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
    await this.saveFile(this.products);
  }

  async getProducts() {
    try {
      const arrayProducts = await this.readFile();
      return arrayProducts;
    } catch (error) {
      console.log("Error al leer el archivo", error);
    }
  }

  async getProductById(id) {
    try {
      const arrayProducts = await this.readFile();
      const find = arrayProducts.find((item) => item.id === id);

      if (!find) {
        console.log("producto no encontrado");
        return null;
      } else {
        console.log("Producto encontrado");
        return find;
      }
    } catch (error) {
      console.log("Error al buscar por id", error);
    }
  }

  //Métodos auxiliares:
  async readFile() {
    const answer = await fs.readFile(this.path, "utf-8");
    const arrayProducts = JSON.parse(answer);
    return arrayProducts;
  }

  async saveFile(arrayProducts) {
    await fs.writeFile(this.path, JSON.stringify(arrayProducts, null, 2));
  }

  //Método para actualizar productos:

  async updateProduct(id, updateProduct) {
    try {
      const arrayProducts = await this.writeFile();

      const index = arrayProducts.findIndex((item) => item.id === id);

      if (index !== -1) {
        arrayProducts[index] = {
          ...arrayProducts[index],
          ...updateProduct,
        };
        await this.saveFile(arrayProducts);
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
      const arrayProducts = await this.writeFile();

      const index = arrayProducts.findIndex((item) => item.id === id);

      if (index !== -1) {
        arrayProducts.splice(index, 1);
        await this.saveFile(arrayProducts);
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
