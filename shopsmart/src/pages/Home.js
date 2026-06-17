import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import { mergeSort, quickSort } from '../algorithms';

export default function Home() {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('search') || '';

  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  const filtered = useMemo(() => {
    let list = products;
    if (searchQuery) list = list.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (activeCategory !== 'All') list = list.filter(p => p.category === activeCategory);
    if (sortBy === 'price-asc')  return mergeSort(list, 'price', true);
    if (sortBy === 'price-desc') return mergeSort(list, 'price', false);
    if (sortBy === 'name')       return mergeSort(list, 'name', true);
    if (sortBy === 'rating')     return quickSort(list, 'rating');
    return list;
  }, [activeCategory, sortBy, searchQuery]);

  return (
    <div style={styles.page}>
      {/* Hero */}
      {!searchQuery && (
        <div style={styles.hero}>
          <div style={styles.heroContent}>
            <p style={styles.heroEyebrow}>New Season Arrivals</p>
            <h1 style={styles.heroTitle}>Discover.<br/>Shop.<span style={styles.heroAccent}> Love.</span></h1>
            <p style={styles.heroSub}>Premium products, unbeatable prices. Powered by intelligent algorithms.</p>
            <button onClick={() => document.getElementById('products').scrollIntoView({behavior:'smooth'})} style={styles.heroBtn}>
              Shop Now →
            </button>
          </div>
          <div style={styles.heroRight}>
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80" alt="fashion" style={styles.heroImg} />
          </div>
        </div>
      )}

      <div id="products" style={styles.main}>
        {/* Filters */}
        <div style={styles.toolbar}>
          <div style={styles.cats}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                style={{...styles.catBtn, ...(activeCategory === cat ? styles.catBtnActive : {})}}>
                {cat}
              </button>
            ))}
          </div>
          <div style={styles.sortWrap}>
            <span style={styles.sortLabel}>Sort by:</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={styles.select}>
              <option value="default">Featured</option>
              <option value="price-asc">Price: Low → High (Merge Sort)</option>
              <option value="price-desc">Price: High → Low (Merge Sort)</option>
              <option value="rating">Top Rated (Quick Sort)</option>
              <option value="name">Name A–Z (Merge Sort)</option>
            </select>
          </div>
        </div>

        {searchQuery && <p style={styles.searchInfo}>{filtered.length} result{filtered.length !== 1 ? 's' : ''} for "<b>{searchQuery}</b>"</p>}

        {filtered.length === 0
          ? <div style={styles.empty}><p>😕 No products found.</p></div>
          : <div style={styles.grid}>
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
        }
      </div>
    </div>
  );
}

const styles = {
  page: { background: '#0a0a0a', minHeight: '100vh', color: '#fff' },
  hero: { display: 'flex', alignItems: 'center', maxWidth: 1280, margin: '0 auto', padding: '60px 24px 40px', gap: 48 },
  heroContent: { flex: 1 },
  heroEyebrow: { color: '#f97316', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, fontSize: 13, margin: '0 0 12px' },
  heroTitle: { fontSize: 'clamp(42px, 6vw, 72px)', fontWeight: 800, margin: '0 0 16px', lineHeight: 1.1, fontFamily: "'Playfair Display', serif" },
  heroAccent: { color: '#f97316' },
  heroSub: { color: '#888', fontSize: 18, margin: '0 0 32px', maxWidth: 400 },
  heroBtn: { background: '#f97316', color: '#fff', border: 'none', borderRadius: 12, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer' },
  heroRight: { flex: 1, borderRadius: 24, overflow: 'hidden', maxWidth: 520 },
  heroImg: { width: '100%', height: 420, objectFit: 'cover', display: 'block' },
  main: { maxWidth: 1280, margin: '0 auto', padding: '0 24px 60px' },
  toolbar: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 32, paddingBottom: 20, borderBottom: '1px solid #1e1e1e' },
  cats: { display: 'flex', flexWrap: 'wrap', gap: 8 },
  catBtn: { padding: '8px 18px', borderRadius: 100, border: '1px solid #2a2a2a', background: 'transparent', color: '#aaa', cursor: 'pointer', fontSize: 13, fontWeight: 500, transition: 'all 0.2s' },
  catBtnActive: { background: '#f97316', borderColor: '#f97316', color: '#fff' },
  sortWrap: { display: 'flex', alignItems: 'center', gap: 10 },
  sortLabel: { color: '#666', fontSize: 13 },
  select: { background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#fff', padding: '8px 14px', borderRadius: 8, fontSize: 13, cursor: 'pointer', outline: 'none' },
  searchInfo: { color: '#aaa', fontSize: 14, marginBottom: 24 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 },
  empty: { textAlign: 'center', padding: '80px 0', color: '#666', fontSize: 18 },
};
