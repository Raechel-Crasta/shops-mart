import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Orders() {
  const { orders } = useCart();
  const navigate = useNavigate();

  if (orders.length === 0) return (
    <div style={styles.empty}>
      <h2 style={{color:'#fff'}}>No orders yet</h2>
      <button onClick={() => navigate('/')} style={styles.shopBtn}>Start Shopping</button>
    </div>
  );

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>My Orders</h1>
        {orders.map(order => (
          <div key={order.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <div>
                <p style={styles.orderId}>Order #{order.id}</p>
                <p style={styles.orderDate}>{order.date}</p>
              </div>
              <div style={styles.headerRight}>
                <span style={styles.status}>{order.status}</span>
                <span style={styles.total}>₹{order.total.toLocaleString()}</span>
              </div>
            </div>
            <div style={styles.items}>
              {order.items.map(item => (
                <div key={item.id} style={styles.item}>
                  <img src={item.image} alt={item.name} style={styles.itemImg}
                    onError={e => { e.target.src = 'https://via.placeholder.com/60x50/1a1a1a/666'; }} />
                  <span style={styles.itemName}>{item.name}</span>
                  <span style={styles.itemQty}>×{item.qty}</span>
                  <span style={styles.itemPrice}>₹{(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: { background: '#0a0a0a', minHeight: '100vh', color: '#fff' },
  container: { maxWidth: 800, margin: '0 auto', padding: '40px 24px' },
  title: { fontSize: 32, fontWeight: 800, marginBottom: 32, fontFamily:"'Playfair Display',serif" },
  card: { background: '#111', borderRadius: 16, marginBottom: 20, border: '1px solid #1e1e1e', overflow: 'hidden' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '20px 24px', borderBottom: '1px solid #1e1e1e' },
  orderId: { color: '#fff', fontWeight: 700, fontSize: 16, margin: 0 },
  orderDate: { color: '#666', fontSize: 13, margin: '4px 0 0' },
  headerRight: { textAlign: 'right' },
  status: { display: 'block', color: '#4ade80', fontWeight: 600, fontSize: 13, marginBottom: 4 },
  total: { color: '#fff', fontWeight: 800, fontSize: 20 },
  items: { padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 10 },
  item: { display: 'flex', alignItems: 'center', gap: 12 },
  itemImg: { width: 48, height: 38, objectFit: 'cover', borderRadius: 6 },
  itemName: { flex: 1, color: '#ccc', fontSize: 14 },
  itemQty: { color: '#666', fontSize: 13 },
  itemPrice: { color: '#fff', fontWeight: 600, fontSize: 14 },
  empty: { background: '#0a0a0a', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 },
  shopBtn: { background: '#f97316', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 32px', fontWeight: 700, fontSize: 15, cursor: 'pointer' },
};
