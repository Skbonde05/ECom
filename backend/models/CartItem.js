const { Schema, model } = require('mongoose');

const cartItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  qty: { type: Number, default: 1 },
  // optional: user mock
  userId: { type: String, default: 'guest' }
}, { timestamps: true });

module.exports = model('CartItem', cartItemSchema);
