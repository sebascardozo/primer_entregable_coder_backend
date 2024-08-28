const productsModel = require("../models/productos.models.js");

class productManager {
  async addProduct({
    title,
    description,
    price,
    code,
    stock,
    category,
    thumbnail,
  }) {
    try {
      if (!title || !description || !price || !code || !stock || !category) {
        console.log("todos los campos son obligatorios");
        return;
      }

      const existProduct = await productsModel.findOne({ code: code });
      if (existProduct) {
        console.log("el codigo debe ser unico");
        return;
      }

      const nuevoProducto = new productsModel({
        title,
        description,
        price,
        code,
        stock,
        category,
        status: true,
        thumbnails: thumbnail || [],
      });

      await newProduct.save();
    } catch (error) {
      console.log("error al agregar un producto", error);
      return null;
    }
  }

  async getProducts() {
    try {
      const arrayProducts = await productsModel.find();
      return arrayProducts;
    } catch (error) {
      console.log("error al obtener los productos", error);
    }
  }

  async getProductById(id) {
    try {
      const product = await productsModel.findById(id);
      if (!product) {
        console.log("producto no encontrado");
        return null;
      }
      return product;
    } catch (error) {
      console.log("error al buscar por id", error);
    }
  }
  ////////////////////////////////////////////////////////////////////////

  //actualizar productos

  async updateProduct(id, productupdated) {
    try {
      const upDated = await productsModel.findByIdAndUpdate(id, productUpdated);

      if (!upDated) {
        console.log(" no se encuentra el producto");
        return null;
      }
      return upDated;
    } catch (error) {
      console.log("tenemos un error al actualizar el producto", error);
    }
  }

  async deleteProduct(id) {
    try {
      const deleteado = await ProductosModel.findByIdAndDelete(id);

      if (!deleteado) {
        console.log(" no se encuentra el producto");
        return null;
      }
    } catch (error) {
      console.log("tenemos un error al eliminar productos");
    }
  }
}

module.exports = productManager;
