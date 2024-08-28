const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

//definimos schema
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  thumbnails: {
    type: [String],
  },
});

productSchema.plugin(mongoosePaginate);

//middleware

productSchema.pre("findOne", function (next) {
  this.populate(""); //aca debo poner los generos o donde se agrupe mis juegos
  next();
});

//definimos el model

const productosModel = mongoose.model("products", productSchema);

module.exports = productosModel;
