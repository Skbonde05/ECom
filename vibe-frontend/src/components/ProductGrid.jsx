import React from 'react'
import ProductCard from './ProductCard'

export default function ProductGrid({ products, onAdd, loading }) {
  return (
    <div className="products-grid">
      {products.map(p => (
        <ProductCard
          key={p._id}
          product={p}
          onAdd={() => onAdd(p._id)}
          disabled={loading}
        />

      ))}
    </div>
  )
}
