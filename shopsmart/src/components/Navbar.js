import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cartCount } = useCart();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/?search=${encodeURIComponent(search.trim())}`);
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        <Link to="/" style={styles.logo}>Shop<span style={styles.logoAccent}>Smart</span></Link>

        <form onSubmit={handleSearch} style={styles.searchForm}>
          <input
            style={styles.searchInput}
            placeholder="Search products, brands..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button type="submit" style={styles.searchBtn}>🔍</button>
        </form>

        <div style={styles.navLinks}>
          <Link to="/" style={styles.link}>Shop</Link>
          <Link to="/algorithms" style={styles.link}>⚙️ Algorithms</Link>
          <Link to="/orders" style={styles.link}>Orders</Link>
          <Link to="/cart" style={styles.cartBtn}>
            🛒
            {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: { background: '#0f0f0f', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid #222' },
  inner: { maxWidth: 1280, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', gap: 24 },
  logo: { fontSize: 22, fontWeight: 800, color: '#fff', textDecoration: 'none', fontFamily: "'Playfair Display', serif", whiteSpace: 'nowrap' },
  logoAccent: { color: '#f97316' },
  searchForm: { flex: 1, display: 'flex', maxWidth: 480 },
  searchInput: { flex: 1, padding: '8px 16px', background: '#1a1a1a', border: '1px solid #333', borderRight: 'none', borderRadius: '8px 0 0 8px', color: '#fff', fontSize: 14, outline: 'none' },
  searchBtn: { padding: '8px 16px', background: '#f97316', border: 'none', borderRadius: '0 8px 8px 0', cursor: 'pointer', fontSize: 16 },
  navLinks: { display: 'flex', alignItems: 'center', gap: 20 },
  link: { color: '#ccc', textDecoration: 'none', fontSize: 14, fontWeight: 500 },
  cartBtn: { position: 'relative', color: '#fff', textDecoration: 'none', fontSize: 22, padding: '4px 8px' },
  badge: { position: 'absolute', top: -4, right: -4, background: '#f97316', color: '#fff', borderRadius: '50%', fontSize: 10, fontWeight: 700, minWidth: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' },
};
