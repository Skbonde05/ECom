const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/vibe_db';

async function connect() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Mongo connection error', err);
    process.exit(1);
  }
}

module.exports = { connect, mongoose };
