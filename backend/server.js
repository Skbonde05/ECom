const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
require('dotenv').config();

const { connect } = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

connect();

// routes
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/checkout', require('./routes/checkout'));
app.use('/images', express.static('../frontend/public/images'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
