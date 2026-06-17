import React, { useState } from 'react';
import { products } from '../data/products';
import {
  binarySearchById, mergeSort, quickSort,
  primMST, kruskalMST, floydWarshall, knapsack, subsetSum
} from '../algorithms';

const LOCATIONS = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune'];
const DIST = [
  [0,1400,980,1340,710,150],
  [1400,0,2150,2200,1500,1200],
  [980,2150,0,350,575,840],
  [1340,2200,350,0,630,1200],
  [710,1500,575,630,0,560],
  [150,1200,840,1200,560,0]
];

const Section = ({ title, algo, desc, children }) => (
  <div style={sec.card}>
    <div style={sec.header}>
      <div>
        <span style={sec.badge}>{algo}</span>
        <h2 style={sec.title}>{title}</h2>
        <p style={sec.desc}>{desc}</p>
      </div>
    </div>
    <div style={sec.body}>{children}</div>
  </div>
);

const Code = ({ text }) => (
  <pre style={{background:'#0d0d0d', borderRadius:10, padding:16, color:'#a3e635', fontSize:12, overflowX:'auto', margin:0, whiteSpace:'pre-wrap', wordBreak:'break-word'}}>{text}</pre>
);

export default function Algorithms() {
  const [bsId, setBsId] = useState('');
  const [bsResult, setBsResult] = useState(null);
  const [bsSearched, setBsSearched] = useState(false);

  const [budget, setBudget] = useState(15000);
  const [ksResult, setKsResult] = useState(null);

  const [subTarget, setSubTarget] = useState(10000);
  const [subResult, setSubResult] = useState(null);
  const [subLoading, setSubLoading] = useState(false);

  const [activeAlgo, setActiveAlgo] = useState(null);

  const handleBS = () => {
    const sorted = [...products].sort((a,b)=>a.id-b.id);
    const r = binarySearchById(sorted, parseInt(bsId));
    setBsResult(r); setBsSearched(true);
  };

  const handleKS = () => {
    const r = knapsack(products, parseInt(budget), false);
    setKsResult(r);
  };

  const handleSS = () => {
    setSubLoading(true);
    setTimeout(() => {
      const r = subsetSum(products.slice(0,10), parseInt(subTarget));
      setSubResult(r); setSubLoading(false);
    }, 100);
  };

  const mergeSorted = mergeSort(products, 'price', true);
  const quickSorted = quickSort(products, 'rating');
  const primEdges = primMST(DIST, LOCATIONS);
  const krusEdges = kruskalMST(
    DIST.flatMap((row,i)=>row.map((w,j)=>({u:i,v:j,weight:w,from:LOCATIONS[i],to:LOCATIONS[j]})).filter((_,j)=>j>i&&DIST[i][j]>0)),
    LOCATIONS.length
  );
  const fwDist = floydWarshall(DIST);

  return (
    <div style={pg.page}>
      <div style={pg.container}>
        <div style={pg.heroWrap}>
          <h1 style={pg.heroTitle}>Algorithm Engine</h1>
          <p style={pg.heroSub}>Every feature in ShopSmart is powered by a classic algorithm. Explore them live below.</p>
        </div>

        <Section algo="O(log n)" title="Binary Search — Find Product by ID" desc="Searches a sorted product list in logarithmic time. Used in the product lookup feature.">
          <div style={row.wrap}>
            <input style={inp.field} placeholder="Enter Product ID (1–15)" value={bsId} onChange={e=>setBsId(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleBS()} />
            <button onClick={handleBS} style={inp.btn}>Search</button>
          </div>
          {bsSearched && (
            bsResult
              ? <Code text={`✅ Found:\nID: ${bsResult.id} | ${bsResult.name}\nCategory: ${bsResult.category} | Price: ₹${bsResult.price.toLocaleString()}\nValue Score: ${bsResult.value} | Stock: ${bsResult.stock}`} />
              : <Code text={`❌ Product ID "${bsId}" not found in sorted list.\nBinary search eliminates half the list each step.`} />
          )}
        </Section>

        <Section algo="O(n log n)" title="Merge Sort — Products by Price" desc="Stable divide-and-conquer sort. Powers the 'Sort by Price' filter on the shop page.">
          <Code text={mergeSorted.slice(0,8).map((p,i)=>`${i+1}. ${p.name.padEnd(28)} ₹${p.price.toLocaleString()}`).join('\n') + '\n... (showing top 8)'}/>
        </Section>

        <Section algo="O(n log n)" title="Quick Sort — Products by Rating" desc="In-place pivot-based sort. Powers the 'Top Rated' filter on the shop page.">
          <Code text={quickSorted.slice(0,8).map((p,i)=>`${i+1}. ${'★'.repeat(Math.round(p.rating))} ${p.rating}  ${p.name}`).join('\n') + '\n... (showing top 8)'}/>
        </Section>

        <Section algo="O(V²)" title="Prim's Algorithm — Minimum Delivery Network" desc="Greedily grows an MST from a source vertex. Finds the cheapest way to connect all delivery hubs.">
          <Code text={"MST Edges (Prim's):\n" + primEdges.map(e=>`  ${e.from.padEnd(14)} ↔  ${e.to.padEnd(14)} ${e.weight} km`).join('\n') + `\n\nTotal MST Cost: ${primEdges.reduce((s,e)=>s+e.weight,0)} km`}/>
        </Section>

        <Section algo="O(E log E)" title="Kruskal's Algorithm — Minimum Delivery Network" desc="Sorts all edges and uses Union-Find to build MST. Alternative to Prim's, same result.">
          <Code text={"MST Edges (Kruskal's):\n" + krusEdges.map(e=>`  ${e.from.padEnd(14)} ↔  ${e.to.padEnd(14)} ${e.weight} km`).join('\n') + `\n\nTotal MST Cost: ${krusEdges.reduce((s,e)=>s+e.weight,0)} km`}/>
        </Section>

        <Section algo="O(V³)" title="Floyd-Warshall — Shortest Delivery Paths" desc="Dynamic programming for all-pairs shortest paths. Finds optimal delivery routes between any two hubs.">
          <div style={{overflowX:'auto'}}>
            <Code text={
              '         ' + LOCATIONS.map(l=>l.padEnd(12)).join('') + '\n' +
              LOCATIONS.map((l,i)=>
                l.padEnd(9) + fwDist[i].map(d=>(d===Infinity?'∞':d).toString().padEnd(12)).join('')
              ).join('\n')
            }/>
          </div>
        </Section>

        <Section algo="O(n×W)" title="0/1 Knapsack — Smart Budget Optimizer" desc="DP maximizes total product value without exceeding your budget. Powers the smart recommendation feature.">
          <div style={row.wrap}>
            <label style={{color:'#aaa',fontSize:14}}>Budget (₹):</label>
            <input style={inp.field} type="number" value={budget} onChange={e=>setBudget(e.target.value)} />
            <button onClick={handleKS} style={inp.btn}>Optimize</button>
          </div>
          {ksResult && <Code text={
            `Budget: ₹${parseInt(budget).toLocaleString()}\n\nBest product selection:\n` +
            ksResult.selected.map(p=>`  ✓ ${p.name.padEnd(28)} ₹${p.price.toLocaleString()}  (value: ${p.value})`).join('\n') +
            `\n\nTotal Spent: ₹${ksResult.selected.reduce((s,p)=>s+p.price,0).toLocaleString()}` +
            `\nTotal Value Score: ${ksResult.totalValue}`
          }/>}
        </Section>

        <Section algo="O(2ⁿ) + pruning" title="Subset Sum — Exact Budget Match (Branch & Bound)" desc="Finds product combinations that exactly match a target price. Branch and bound prunes impossible paths early.">
          <div style={row.wrap}>
            <label style={{color:'#aaa',fontSize:14}}>Target (₹):</label>
            <input style={inp.field} type="number" value={subTarget} onChange={e=>setSubTarget(e.target.value)} />
            <button onClick={handleSS} style={inp.btn}>{subLoading ? 'Searching...' : 'Find Combinations'}</button>
          </div>
          {subResult && <Code text={
            subResult.length === 0
              ? `No exact combination found for ₹${parseInt(subTarget).toLocaleString()}\n(Searched top 10 products)`
              : `Found ${subResult.length} combination(s) for ₹${parseInt(subTarget).toLocaleString()}:\n\n` +
                subResult.slice(0,3).map((combo,i)=>
                  `Combo ${i+1}:\n` + combo.map(p=>`  • ${p.name}  ₹${p.price}`).join('\n')
                ).join('\n\n') +
                (subResult.length > 3 ? `\n\n...and ${subResult.length-3} more` : '')
          }/>}
        </Section>

      </div>
    </div>
  );
}

const pg = {
  page: { background: '#0a0a0a', minHeight: '100vh', color: '#fff' },
  container: { maxWidth: 860, margin: '0 auto', padding: '40px 24px 80px' },
  heroWrap: { marginBottom: 48, borderBottom: '1px solid #1e1e1e', paddingBottom: 40 },
  heroTitle: { fontSize: 'clamp(32px,5vw,52px)', fontWeight: 800, margin: '0 0 12px', fontFamily:"'Playfair Display',serif" },
  heroSub: { color: '#666', fontSize: 16, margin: 0 },
};
const sec = {
  card: { background: '#111', border: '1px solid #1e1e1e', borderRadius: 16, marginBottom: 24, overflow: 'hidden' },
  header: { padding: '24px 24px 0' },
  badge: { display: 'inline-block', background: '#1a1a1a', border: '1px solid #f97316', color: '#f97316', borderRadius: 6, padding: '2px 10px', fontSize: 12, fontWeight: 700, marginBottom: 8, fontFamily: 'monospace' },
  title: { fontSize: 20, fontWeight: 700, margin: '4px 0 6px', color: '#fff' },
  desc: { color: '#666', fontSize: 14, margin: '0 0 16px' },
  body: { padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: 12 },
};
const row = { wrap: { display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' } };
const inp = {
  field: { background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#fff', padding: '9px 14px', borderRadius: 8, fontSize: 14, outline: 'none', minWidth: 180 },
  btn: { background: '#f97316', border: 'none', color: '#fff', padding: '9px 20px', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 14 },
};
