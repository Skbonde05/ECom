const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  imageUrl: String
});


module.exports = model('Product', productSchema);
