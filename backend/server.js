require('dotenv').config();   // <-- MUST BE VERY FIRST LINE

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const { connect } = require('./db');

const app = express();

// middlewares
app.use(cors());
app.use(bodyParser.json());

// connect DB
connect();

// API routes
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/checkout', require('./routes/checkout'));

// serve images correctly
app.use('/images', express.static(path.join(__dirname, '../frontend/public/images')));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
