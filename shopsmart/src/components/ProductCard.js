import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [added, setAdded] = useState(false);
  const isWished = wishlist.find(i => i.id === product.id);

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link to={`/product/${product.id}`} style={styles.card}>
      <div style={styles.imgWrap}>
        <img src={product.image} alt={product.name} style={styles.img} loading="lazy"
          onError={e => { e.target.src = `https://via.placeholder.com/400x300/1a1a1a/666?text=${encodeURIComponent(product.name)}`; }} />
        <button onClick={e => { e.preventDefault(); toggleWishlist(product); }}
          style={{...styles.wishBtn, color: isWished ? '#f97316' : '#aaa'}}>
          {isWished ? '♥' : '♡'}
        </button>
        {product.stock <= 5 && <span style={styles.stockBadge}>Only {product.stock} left!</span>}
      </div>
      <div style={styles.info}>
        <p style={styles.category}>{product.category}</p>
        <h3 style={styles.name}>{product.name}</h3>
        <div style={styles.ratingRow}>
          <span style={styles.stars}>{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</span>
          <span style={styles.reviewCount}>({product.reviews.toLocaleString()})</span>
        </div>
        <div style={styles.priceRow}>
          <span style={styles.price}>₹{product.price.toLocaleString()}</span>
          <button onClick={handleAdd} style={{...styles.addBtn, background: added ? '#16a34a' : '#f97316'}}>
            {added ? '✓ Added' : '+ Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
}

const styles = {
  card: { background: '#141414', borderRadius: 16, overflow: 'hidden', textDecoration: 'none', color: 'inherit', display: 'block', border: '1px solid #222', transition: 'transform 0.2s, border-color 0.2s', cursor: 'pointer' },
  imgWrap: { position: 'relative', paddingTop: '72%', overflow: 'hidden', background: '#1a1a1a' },
  img: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' },
  wishBtn: { position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', width: 36, height: 36, fontSize: 18, cursor: 'pointer', backdropFilter: 'blur(4px)' },
  stockBadge: { position: 'absolute', top: 10, left: 10, background: '#ef4444', color: '#fff', padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 600 },
  info: { padding: '14px 16px 16px' },
  category: { color: '#f97316', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 4px' },
  name: { color: '#fff', fontSize: 15, fontWeight: 600, margin: '0 0 8px', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' },
  ratingRow: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 },
  stars: { color: '#fbbf24', fontSize: 13 },
  reviewCount: { color: '#666', fontSize: 12 },
  priceRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  price: { color: '#fff', fontSize: 18, fontWeight: 700 },
  addBtn: { border: 'none', borderRadius: 8, padding: '7px 14px', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer', transition: 'background 0.2s' },
};
