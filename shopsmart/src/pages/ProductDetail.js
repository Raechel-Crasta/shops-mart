import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [added, setAdded] = useState(false);

  const product = products.find(p => p.id === parseInt(id));
  if (!product) return <div style={{color:'#fff',padding:40}}>Product not found. <button onClick={() => navigate('/')} style={{color:'#f97316',background:'none',border:'none',cursor:'pointer'}}>Go back</button></div>;

  const isWished = wishlist.find(i => i.id === product.id);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <button onClick={() => navigate(-1)} style={styles.back}>← Back</button>
        <div style={styles.layout}>
          <div style={styles.imgSide}>
            <img src={product.image} alt={product.name} style={styles.img}
              onError={e => { e.target.src = `https://via.placeholder.com/600x500/1a1a1a/666?text=${encodeURIComponent(product.name)}`; }} />
          </div>
          <div style={styles.infoSide}>
            <p style={styles.category}>{product.category}</p>
            <h1 style={styles.name}>{product.name}</h1>
            <div style={styles.ratingRow}>
              <span style={styles.stars}>{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5-Math.round(product.rating))}</span>
              <span style={styles.rating}>{product.rating}</span>
              <span style={styles.reviews}>({product.reviews.toLocaleString()} reviews)</span>
            </div>
            <p style={styles.desc}>{product.description}</p>
            <div style={styles.priceWrap}>
              <span style={styles.price}>₹{product.price.toLocaleString()}</span>
              <span style={product.stock > 5 ? styles.inStock : styles.lowStock}>
                {product.stock > 5 ? '✓ In Stock' : `⚠ Only ${product.stock} left`}
              </span>
            </div>
            <div style={styles.specs}>
              <div style={styles.spec}><span style={styles.specLabel}>Weight</span><span>{product.weight}g</span></div>
              <div style={styles.spec}><span style={styles.specLabel}>Value Score</span><span>{product.value}/100</span></div>
              <div style={styles.spec}><span style={styles.specLabel}>Product ID</span><span>#{product.id}</span></div>
            </div>
            <div style={styles.actions}>
              <button onClick={handleAdd} style={{...styles.addBtn, background: added ? '#16a34a' : '#f97316'}}>
                {added ? '✓ Added to Cart!' : 'Add to Cart'}
              </button>
              <button onClick={() => toggleWishlist(product)} style={{...styles.wishBtn, borderColor: isWished ? '#f97316' : '#333', color: isWished ? '#f97316' : '#aaa'}}>
                {isWished ? '♥ Saved' : '♡ Wishlist'}
              </button>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div style={styles.related}>
            <h2 style={styles.relatedTitle}>You may also like</h2>
            <div style={styles.relatedGrid}>
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { background: '#0a0a0a', minHeight: '100vh', color: '#fff' },
  container: { maxWidth: 1280, margin: '0 auto', padding: '32px 24px' },
  back: { background: 'none', border: '1px solid #2a2a2a', color: '#aaa', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', marginBottom: 32, fontSize: 14 },
  layout: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, marginBottom: 64 },
  imgSide: { borderRadius: 20, overflow: 'hidden', background: '#141414' },
  img: { width: '100%', height: 500, objectFit: 'cover', display: 'block' },
  infoSide: { display: 'flex', flexDirection: 'column', gap: 16 },
  category: { color: '#f97316', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.5, fontSize: 12, margin: 0 },
  name: { fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, margin: 0, fontFamily:"'Playfair Display',serif", lineHeight: 1.2 },
  ratingRow: { display: 'flex', alignItems: 'center', gap: 8 },
  stars: { color: '#fbbf24', fontSize: 18 },
  rating: { color: '#fff', fontWeight: 700, fontSize: 16 },
  reviews: { color: '#666', fontSize: 14 },
  desc: { color: '#aaa', lineHeight: 1.7, fontSize: 15, margin: 0 },
  priceWrap: { display: 'flex', alignItems: 'center', gap: 16 },
  price: { fontSize: 36, fontWeight: 800, color: '#fff' },
  inStock: { color: '#4ade80', fontSize: 13, fontWeight: 600 },
  lowStock: { color: '#fb923c', fontSize: 13, fontWeight: 600 },
  specs: { display: 'flex', gap: 16, background: '#111', borderRadius: 12, padding: 20 },
  spec: { flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 4 },
  specLabel: { color: '#666', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 },
  actions: { display: 'flex', gap: 12 },
  addBtn: { flex: 1, padding: '14px 0', border: 'none', borderRadius: 12, color: '#fff', fontWeight: 700, fontSize: 16, cursor: 'pointer', transition: 'background 0.3s' },
  wishBtn: { padding: '14px 20px', background: 'transparent', border: '1px solid', borderRadius: 12, fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s' },
  related: { borderTop: '1px solid #1e1e1e', paddingTop: 48 },
  relatedTitle: { fontSize: 24, fontWeight: 700, marginBottom: 24, fontFamily:"'Playfair Display',serif" },
  relatedGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 },
};
