const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

// GET /api/cart => items + total
router.get('/', async (req, res) => {
  try {
    const items = await CartItem.find({ userId: 'guest' }).populate('product').lean();
    const mapped = items.map(it => ({
      id: it._id,
      productId: it.product._id,
      name: it.product.name,
      price: it.product.price,
      qty: it.qty
    }));
    const total = mapped.reduce((s, i) => s + i.price * i.qty, 0);
    res.json({ items: mapped, total: parseFloat(total.toFixed(2)) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// POST /api/cart { productId, qty }
router.post('/', async (req, res) => {
  try {
    const { productId, qty } = req.body;
    if (!productId || !qty || qty <= 0) return res.status(400).json({ error: 'Invalid payload' });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // If same product present, increment
    let existing = await CartItem.findOne({ product: productId, userId: 'guest' });
    if (existing) {
      existing.qty += qty;
      await existing.save();
      return res.status(200).json({ id: existing._id, productId, qty: existing.qty });
    }

    const item = new CartItem({ product: productId, qty, userId: 'guest' });
    await item.save();
    res.status(201).json({ id: item._id, productId, qty: item.qty });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

// DELETE /api/cart/:id -> remove by cart item id
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await CartItem.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ error: 'Not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to remove item' });
  }
});

// PATCH /api/cart/:id -> update qty
router.patch('/:id', async (req, res) => {
  try {
    const { qty } = req.body;
    if (!qty || qty < 1) return res.status(400).json({ error: 'Invalid qty' });
    const item = await CartItem.findByIdAndUpdate(req.params.id, { qty }, { new: true });
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json({ id: item._id, qty: item.qty });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update qty' });
  }
});

module.exports = router;
