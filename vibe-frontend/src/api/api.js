const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

// GET /api/products
export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/api/products`)
  if (!res.ok) throw new Error("Failed to fetch products")
  return await res.json()
}

// GET /api/cart
export async function fetchCart() {
  const res = await fetch(`${API_BASE}/api/cart`)
  if (!res.ok) throw new Error("Failed to fetch cart")
  return await res.json()
}

// POST /api/cart (add item)
export async function addToCart(productId, qty = 1) {
  const res = await fetch(`${API_BASE}/api/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, qty })
  })
  if (!res.ok) throw new Error("Failed to add to cart")
  return await res.json()
}

// DELETE /api/cart/:id
export async function removeFromCart(id) {
  const res = await fetch(`${API_BASE}/api/cart/${id}`, { method: "DELETE" })
  if (!res.ok) throw new Error("Failed to remove item")
}

// PATCH /api/cart/:id (update quantity)
export async function updateCartItem(id, qty) {
  const res = await fetch(`${API_BASE}/api/cart/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ qty })
  })
  if (!res.ok) throw new Error("Failed to update item quantity")
  return await res.json()
}

// POST /api/checkout
export async function checkout(cartItems, name, email) {
  const res = await fetch(`${API_BASE}/api/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cartItems, name, email })
  })
  if (!res.ok) throw new Error("Checkout failed")
  return await res.json()
}
