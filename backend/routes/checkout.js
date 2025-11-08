// backend/routes/checkout.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Receipt = require('../models/Receipt');

router.post('/', async (req, res) => {
  try {
    const { cartItems, name, email } = req.body;
    console.log('POST /api/checkout payload:', { cartItemsLength: Array.isArray(cartItems) ? cartItems.length : 0, name, email });

    if (!email || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: 'Missing checkout details' });
    }

    const total = cartItems.reduce((sum, i) => sum + Number(i.price || 0), 0);

    const receipt = new Receipt({
      name, email, total, timestamp: new Date(),
      receiptId: Math.random().toString(36).substring(2, 10).toUpperCase()
    });
    await receipt.save();

    console.log('DEBUG env EMAIL_USER:', process.env.EMAIL_USER);
    console.log('DEBUG EMAIL_PASS length:', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0);

    // create transporter (explicit SMTP)
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    try {
      await transporter.verify();
      console.log('✅ SMTP transporter verified');
    } catch (verifyErr) {
      console.error('❌ SMTP verify failed:', verifyErr);
      return res.status(500).json({ error: 'Mail server verification failed', details: verifyErr.message || verifyErr.toString() });
    }

    const itemsHtml = cartItems.map(i => {
      const price = Number(i.price) || 0;
      return `<tr><td style="padding:8px;">${i.name || 'Product'}</td><td style="padding:8px; text-align:right;">$${price.toFixed(2)}</td></tr>`;
    }).join('');

    const mailOptions = {
      from: `"Vibe Commerce" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `🧾 Your Vibe Commerce Receipt #${receipt.receiptId}`,
      html: `
        <div style="font-family:Arial, sans-serif; max-width:600px; margin:auto;">
          <h2>Thanks ${name || ''}</h2>
          <table style="width:100%">${itemsHtml}</table>
          <p><b>Total:</b> $${total.toFixed(2)}</p>
          <p>Receipt ID: ${receipt.receiptId}</p>
        </div>`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.messageId);

    return res.json({ success: true, receiptId: receipt.receiptId, total, timestamp: receipt.timestamp });
  } catch (err) {
    console.error('Checkout error:', err);
    return res.status(500).json({ error: 'Checkout failed', details: err.message || err.toString() });
  }
});

module.exports = router;
