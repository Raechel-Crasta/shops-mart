import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart, updateQty, placeOrder, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    const order = placeOrder();
    if (order) {
      alert(`🎉 Order #${order.id} placed successfully!\nTotal: ₹${order.total.toLocaleString()}`);
      navigate('/orders');
    }
  };

  if (cart.length === 0) return (
    <div style={styles.empty}>
      <div style={styles.emptyBox}>
        <p style={styles.emptyIcon}>🛒</p>
        <h2 style={styles.emptyTitle}>Your cart is empty</h2>
        <p style={styles.emptySub}>Add some products to get started</p>
        <button onClick={() => navigate('/')} style={styles.shopBtn}>Continue Shopping</button>
      </div>
    </div>
  );

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Shopping Cart</h1>
        <div style={styles.layout}>
          <div style={styles.itemsCol}>
            {cart.map(item => (
              <div key={item.id} style={styles.item}>
                <img src={item.image} alt={item.name} style={styles.itemImg}
                  onError={e => { e.target.src = `https://via.placeholder.com/100x80/1a1a1a/666`; }} />
                <div style={styles.itemInfo}>
                  <p style={styles.itemCat}>{item.category}</p>
                  <p style={styles.itemName}>{item.name}</p>
                  <p style={styles.itemPrice}>₹{item.price.toLocaleString()}</p>
                </div>
                <div style={styles.qtyControl}>
                  <button onClick={() => updateQty(item.id, item.qty - 1)} style={styles.qtyBtn}>−</button>
                  <span style={styles.qty}>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} style={styles.qtyBtn}>+</button>
                </div>
                <p style={styles.subtotal}>₹{(item.price * item.qty).toLocaleString()}</p>
                <button onClick={() => removeFromCart(item.id)} style={styles.removeBtn}>✕</button>
              </div>
            ))}
          </div>
          <div style={styles.summary}>
            <h2 style={styles.summaryTitle}>Order Summary</h2>
            <div style={styles.summaryRow}><span>Subtotal ({cart.reduce((s,i)=>s+i.qty,0)} items)</span><span>₹{cartTotal.toLocaleString()}</span></div>
            <div style={styles.summaryRow}><span>Delivery</span><span style={{color:'#4ade80'}}>FREE</span></div>
            <div style={{...styles.summaryRow, ...styles.summaryTotal}}><span>Total</span><span>₹{cartTotal.toLocaleString()}</span></div>
            <button onClick={handleCheckout} style={styles.checkoutBtn}>Place Order →</button>
            <button onClick={() => navigate('/')} style={styles.continueBtn}>Continue Shopping</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { background: '#0a0a0a', minHeight: '100vh', color: '#fff' },
  container: { maxWidth: 1100, margin: '0 auto', padding: '40px 24px' },
  title: { fontSize: 32, fontWeight: 800, marginBottom: 32, fontFamily:"'Playfair Display',serif" },
  layout: { display: 'grid', gridTemplateColumns: '1fr 340px', gap: 40, alignItems: 'start' },
  itemsCol: { display: 'flex', flexDirection: 'column', gap: 12 },
  item: { display: 'flex', alignItems: 'center', gap: 16, background: '#111', borderRadius: 14, padding: 16, border: '1px solid #1e1e1e' },
  itemImg: { width: 80, height: 64, objectFit: 'cover', borderRadius: 8, flexShrink: 0 },
  itemInfo: { flex: 1, minWidth: 0 },
  itemCat: { color: '#f97316', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 3px' },
  itemName: { color: '#fff', fontWeight: 600, fontSize: 14, margin: '0 0 4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  itemPrice: { color: '#aaa', fontSize: 13, margin: 0 },
  qtyControl: { display: 'flex', alignItems: 'center', gap: 10, background: '#1a1a1a', borderRadius: 8, padding: '4px 8px' },
  qtyBtn: { background: 'none', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer', lineHeight: 1, width: 24, textAlign: 'center' },
  qty: { color: '#fff', fontWeight: 700, minWidth: 24, textAlign: 'center' },
  subtotal: { color: '#fff', fontWeight: 700, fontSize: 15, minWidth: 80, textAlign: 'right' },
  removeBtn: { background: 'none', border: 'none', color: '#555', fontSize: 16, cursor: 'pointer', padding: '0 4px' },
  summary: { background: '#111', borderRadius: 16, padding: 24, border: '1px solid #1e1e1e', position: 'sticky', top: 80 },
  summaryTitle: { fontSize: 18, fontWeight: 700, marginBottom: 20 },
  summaryRow: { display: 'flex', justifyContent: 'space-between', color: '#aaa', fontSize: 14, marginBottom: 12 },
  summaryTotal: { color: '#fff', fontWeight: 700, fontSize: 18, borderTop: '1px solid #2a2a2a', paddingTop: 16, marginTop: 4 },
  checkoutBtn: { width: '100%', background: '#f97316', color: '#fff', border: 'none', borderRadius: 12, padding: '14px 0', fontWeight: 700, fontSize: 16, cursor: 'pointer', marginTop: 20 },
  continueBtn: { width: '100%', background: 'none', color: '#aaa', border: '1px solid #2a2a2a', borderRadius: 12, padding: '12px 0', fontWeight: 600, fontSize: 14, cursor: 'pointer', marginTop: 10 },
  empty: { background: '#0a0a0a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  emptyBox: { textAlign: 'center' },
  emptyIcon: { fontSize: 64 },
  emptyTitle: { color: '#fff', fontSize: 28, fontWeight: 700, margin: '16px 0 8px' },
  emptySub: { color: '#666', marginBottom: 32 },
  shopBtn: { background: '#f97316', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 32px', fontWeight: 700, fontSize: 15, cursor: 'pointer' },
};
