import React from 'react'

// Map product names to local images
function imageForProduct(name = '') {
  const map = {
    "Vibe T-Shirt": "/images/tshirt.jpg",
    "Vibe Hoodie": "/images/hoodie.jpg",
    "Vibe Cap": "/images/cap.jpg",
    "Vibe Mug": "/images/mug.jpg",
    "Vibe Sticker Pack": "/images/travel.jpg",
    "Vibe Tote Bag": "/images/tote.jpg",
    "Vibe Water Bottle": "/images/bottle.jpg",
    "Vibe Notebook": "/images/notebook.jpg",
    "Vibe Socks": "/images/socks.jpg",
    "Vibe Phone Case": "/images/phonecase.jpg",
    "Vibe Keychain": "/images/keychain.jpg",
    "Vibe Backpack": "/images/backpack.jpg",
    "Vibe Sunglasses": "/images/sunglasses.jpg",
    "Vibe Sweatpants": "/images/sweatpants.jpg"
  }

  // fallback hero/banner image if not found
  return map[name] || "/images/hero-banner.jpg"
}

export default function ProductCard({ product, onAdd, disabled = false }) {
  const img = imageForProduct(product.name)

  return (
    <div
      className="product-card transition-all hover:shadow-xl bg-white rounded-2xl overflow-hidden flex flex-col justify-between"
      style={{ border: '1px solid #f1f1f1' }}
    >
      <div className="product-image relative w-full overflow-hidden">
        <img
          src={img}
          alt={product.name}
          className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 flex-grow">
        <h3 className="product-title text-lg font-semibold mb-1 text-gray-800">{product.name}</h3>
        <p className="product-desc text-sm text-gray-600">{product.description || 'High quality product'}</p>
      </div>

      <div className="product-footer flex items-center justify-between p-4 border-t">
        <div className="price text-purple-600 font-bold text-base">${(product.price || 0).toFixed(2)}</div>
        <button
          onClick={onAdd}
          disabled={disabled}
          className={`btn-primary px-4 py-2 rounded-md font-medium text-white transition ${
            disabled
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          Add
        </button>
      </div>
    </div>
  )
}
