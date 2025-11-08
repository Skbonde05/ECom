import React, { useState } from 'react'

export default function CheckoutModal({ onClose, onSubmit }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!name || !email) return
    onSubmit(name, email)
  }

  return (
    <div style={{
      position:'fixed', inset:0, display:'flex', alignItems:'center',
      justifyContent:'center', background:'rgba(2,6,23,0.35)', zIndex:120
    }}>
      <div style={{width:380, background:'#fff', borderRadius:12, padding:20, boxShadow:'0 30px 80px rgba(2,6,23,0.2)'}}>
        <h3 style={{marginTop:0, color:'#111'}}>Complete your order</h3>
        <p className="muted" style={{marginTop:0}}>We’ll send a mock receipt to your email.</p>

        <form onSubmit={submit} style={{display:'flex', flexDirection:'column', gap:10, marginTop:12}}>
          <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} className="input" required />
          <input placeholder="Email address" type="email" value={email} onChange={e=>setEmail(e.target.value)} className="input" required />
          <div style={{display:'flex', gap:8, marginTop:6}}>
            <button type="button" onClick={onClose} className="btn-outline" style={{flex:1}}>Cancel</button>
            <button type="submit" className="btn-primary" style={{flex:1}}>Place order</button>
          </div>
        </form>
      </div>
    </div>
  )
}
