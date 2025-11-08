import React from 'react'

export default function Cart({ cart, onRemove, onUpdateQty, onCheckout }) {
  return (
    <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
      {cart.items.length === 0 ? (
        <div style={{padding:'20px 6px', color:'#6b7280'}}>Your cart is empty</div>
      ) : (
        <>
          <div className="cart-list">
            {cart.items.map(i => (
              <div key={i.id} className="cart-item">
                <div className="meta">
                  <div style={{fontWeight:700}}>{i.name}</div>
                  <div style={{color:'#6b7280', fontSize:13}}>${i.price.toFixed(2)}</div>
                </div>

                <div style={{display:'flex', alignItems:'center', gap:8}}>
                  <div className="qty-controls">
                    <button onClick={() => onUpdateQty(i.id, i.qty - 1)} disabled={i.qty <= 1} className="btn-ghost">-</button>
                    <strong style={{minWidth:22, textAlign:'center'}}>{i.qty}</strong>
                    <button onClick={() => onUpdateQty(i.id, i.qty + 1)} className="btn-ghost">+</button>
                  </div>
                  <button className="remove" onClick={() => onRemove(i.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div style={{paddingTop:12, borderTop:'1px solid #f3f4f6'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
              <div style={{fontWeight:800}}>Total</div>
              <div style={{fontWeight:800}}>${cart.total.toFixed(2)}</div>
            </div>

            <div style={{display:'flex', gap:8}}>
              <button className="btn-outline" style={{flex:1}} onClick={onCheckout}>Checkout</button>
              <button className="btn-primary" style={{flex:1}} onClick={onCheckout}>Quick Pay</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
