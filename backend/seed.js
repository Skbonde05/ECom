const dotenv = require('dotenv');
dotenv.config();
const { connect } = require('./db');
const Product = require('./models/Product');

async function seed() {
  try {
    await connect();
    const count = await Product.countDocuments();
    if (count > 0) {
      console.log('✅ Products already seeded.');
      process.exit(0);
    }

    const seedProducts = [
      { name: 'Vibe T-Shirt', price: 19.99, description: 'Soft cotton unisex t-shirt with premium print', imageUrl: '/images/tshirt.jpg' },
      { name: 'Vibe Hoodie', price: 39.99, description: 'Cozy fleece hoodie for everyday comfort', imageUrl: '/images/hoodie.jpg' },
      { name: 'Vibe Cap', price: 12.99, description: 'Adjustable baseball cap with embroidered logo', imageUrl: '/images/cap.jpg' },
      { name: 'Vibe Mug', price: 9.99, description: 'Ceramic mug for your daily coffee ritual', imageUrl: '/images/mug.jpg' },
      { name: 'Vibe Sticker Pack', price: 4.99, description: 'Set of 5 waterproof laptop stickers', imageUrl: '/images/stickers.jpg' },
      { name: 'Vibe Tote Bag', price: 14.99, description: 'Durable canvas tote for all-day use', imageUrl: '/images/tote.jpg' },
      { name: 'Vibe Water Bottle', price: 24.99, description: 'Eco-friendly stainless steel bottle with matte finish', imageUrl: '/images/bottle.jpg' },
      { name: 'Vibe Notebook', price: 11.49, description: 'Minimal journal notebook for creative minds', imageUrl: '/images/notebook.jpg' },
      { name: 'Vibe Socks', price: 7.99, description: 'Soft breathable cotton socks (pair)', imageUrl: '/images/socks.jpg' },
      { name: 'Vibe Phone Case', price: 16.99, description: 'Shockproof case with glossy logo design', imageUrl: '/images/phonecase.jpg' },
      { name: 'Vibe Keychain', price: 5.49, description: 'Metal keychain with laser-cut logo', imageUrl: '/images/keychain.jpg' },
      { name: 'Vibe Backpack', price: 49.99, description: 'Stylish everyday backpack with laptop pocket', imageUrl: '/images/backpack.jpg' },
      { name: 'Vibe Sunglasses', price: 22.99, description: 'UV-protective black frame sunglasses', imageUrl: '/images/sunglasses.jpg' },
      { name: 'Vibe Sweatpants', price: 34.99, description: 'Relaxed fit sweatpants with stretchable waist', imageUrl: '/images/sweatpants.jpg' },
    ];

    await Product.insertMany(seedProducts);
    console.log('✅ Seeded products successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}

seed();
