import React, { useEffect, useState } from 'react'
import { fetchProducts, fetchCart, addToCart, removeFromCart, updateCartItem, checkout } from './api/api'
import ProductGrid from './components/ProductGrid'
import Cart from './components/Cart'
import CheckoutModal from './components/CheckoutModal'
import './App.css'

export default function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({ items: [], total: 0 })
  const [showCheckout, setShowCheckout] = useState(false)
  const [receipt, setReceipt] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState({ open: false });

  const loadProducts = async () => {
    try {
      const p = await fetchProducts()
      setProducts(p)
    } catch (e) {
      setError(e.message || 'Failed to fetch')
    }
  }

  const loadCart = async () => {
    try {
      const c = await fetchCart()
      setCart(c)
    } catch (e) {
      setError(e.message || 'Failed to fetch cart')
    }
  }

  useEffect(() => {
    loadProducts()
    loadCart()
  }, [])

  const handleAdd = async (productId) => {
    setLoading(true)
    setError(null)
    try {
      await addToCart(productId, 1)
      await loadCart()
      setDrawerOpen(true)
    } catch (e) {
      setError(e.message)
    } finally { setLoading(false) }
  }

  const handleRemove = async (cartItemId) => {
    setLoading(true)
    setError(null)
    try {
      await removeFromCart(cartItemId)
      await loadCart()
    } catch (e) {
      setError(e.message)
    } finally { setLoading(false) }
  }

  const handleUpdateQty = async (cartItemId, qty) => {
    if (qty < 1) return
    setLoading(true)
    setError(null)
    try {
      await updateCartItem(cartItemId, qty)
      await loadCart()
    } catch (e) {
      setError(e.message)
    } finally { setLoading(false) }
  }

  const handleCheckout = async (name, email) => {
  try {
    setLoading(true);

    const response = await checkout(
      cart.items.map((i) => ({
        name: i.name,
        price: i.price,
      })),
      name,
      email
    );

    if (response.success) {
      // Clear cart locally
      setCart({ items: [], total: 0 });

      // Show confirmation modal
      setShowCheckout(false);
      setShowSuccess({
        open: true,
        receiptId: response.receiptId,
        total: response.total,
      });
    }
  } catch (err) {
    alert("Checkout failed. Please try again.");
    console.error("Checkout error:", err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="app-root">
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand">
            <div className="logo">Vibe<span className="dot">.</span></div>
            <div className="tag">Mock Commerce</div>
          </div>

          <nav className="nav">
            <button className="btn-ghost" onClick={() => window.location.reload()}>Home</button>
            <button className="btn-ghost" onClick={() => setDrawerOpen(true)}>
              Cart <span className="badge">{cart.items.length}</span>
            </button>
          </nav>
        </div>

        <div className="hero container">
          <div className="hero-left">
            <h1 className="hero-title">Curated merch for your vibe</h1>
            <p className="hero-sub">Fast checkout, beautiful designs — built for your demo. Try adding items to the cart.</p>
            <div className="hero-cta">
              <button className="btn-primary" onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}>Shop Now</button>
              <button className="btn-outline" onClick={() => setDrawerOpen(true)}>View Cart ({cart.items.length})</button>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-card">
              <img src="/images/hero.jpg" alt="Vibe Commerce Hero" />
              <div className="hero-card-caption">Limited drop — feel the vibe</div>
            </div>
          </div>
        </div>
      </header>

      <main className="container main-area">
        {error && <div className="error">{error}</div>}

        <section className="section-head">
          <h2>Popular products</h2>
          <p className="muted">Hand-picked items — simple and fun.</p>
        </section>

        <ProductGrid products={products} onAdd={handleAdd} loading={loading} />

        <footer className="site-footer container">
          <div>© 2025 Vibe Commerce — Mock E-Com</div>
          <div className="muted">Frontend demo • No payments • MongoDB backend</div>
        </footer>
      </main>

      {drawerOpen && (
      <div className="cart-overlay" onClick={() => setDrawerOpen(false)}>
        <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
          <div className="cart-header">
            <h3>Your Cart</h3>
            <button className="close" onClick={() => setDrawerOpen(false)}>✕</button>
          </div>

          <Cart
            cart={cart}
            onRemove={handleRemove}
            onUpdateQty={handleUpdateQty}
            onCheckout={() => { setShowCheckout(true); setDrawerOpen(false); }}
          />
        </div>
      </div>
    )}

      <button className="floating-checkout" onClick={() => setDrawerOpen(true)}>
        🛒 {cart.items.length} — Checkout
      </button>

      {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} onSubmit={handleCheckout} />}

      {receipt && (
        <div className="receipt-popup">
          <div className="receipt-card">
            <h3>Thanks for your order!</h3>
            <p className="muted">Receipt: {receipt.receiptId}</p>
            <p className="strong">Total: ${receipt.total}</p>
            <p className="muted">{new Date(receipt.timestamp).toLocaleString()}</p>
            <button className="btn-primary" onClick={() => setReceipt(null)}>Close</button>
          </div>
        </div>
      )}

      {showSuccess?.open && (
  <div className="checkout-success-overlay" onClick={() => setShowSuccess({ open: false })}>
    <div className="checkout-success-modal" onClick={(e) => e.stopPropagation()}>
      <h2>✅ Order Confirmed!</h2>
      <p>Thank you for your purchase.</p>
      <p>
        <b>Receipt ID:</b> {showSuccess.receiptId}
      </p>
      <p>
        <b>Total:</b> ${showSuccess.total.toFixed(2)}
      </p>
      <button onClick={() => setShowSuccess({ open: false })} className="btn-primary">
        Close
      </button>
    </div>
  </div>
)}

    </div>
  )
}
