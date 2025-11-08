# Vibe Backend (MongoDB)

1. Copy .env.example -> .env and set MONGO_URI (e.g. mongodb://localhost:27017/vibe_db)
2. Install:
   npm install

3. Seed products:
   npm run seed

4. Start server:
   npm run dev    # or npm start

Server listens on http://localhost:4000

APIs:
GET /api/products
POST /api/cart { productId, qty }
GET /api/cart
PATCH /api/cart/:id { qty }
DELETE /api/cart/:id
POST /api/checkout { cartItems: [{ id }], name, email }
