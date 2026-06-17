// ─── Binary Search ────────────────────────────────────────────────
export function binarySearchById(sortedProducts, targetId) {
  let lo = 0, hi = sortedProducts.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (sortedProducts[mid].id === targetId) return sortedProducts[mid];
    else if (sortedProducts[mid].id < targetId) lo = mid + 1;
    else hi = mid - 1;
  }
  return null;
}

// ─── Merge Sort ───────────────────────────────────────────────────
export function mergeSort(arr, key, asc = true) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left  = mergeSort(arr.slice(0, mid), key, asc);
  const right = mergeSort(arr.slice(mid), key, asc);
  return merge(left, right, key, asc);
}
function merge(l, r, key, asc) {
  const result = [];
  let i = 0, j = 0;
  while (i < l.length && j < r.length) {
    const cmp = asc ? l[i][key] <= r[j][key] : l[i][key] >= r[j][key];
    if (cmp) result.push(l[i++]); else result.push(r[j++]);
  }
  return [...result, ...l.slice(i), ...r.slice(j)];
}

// ─── Quick Sort ───────────────────────────────────────────────────
export function quickSort(arr, key) {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1][key];
  const left  = arr.slice(0, -1).filter(x => x[key] >= pivot);
  const right = arr.slice(0, -1).filter(x => x[key] < pivot);
  return [...quickSort(left, key), arr[arr.length - 1], ...quickSort(right, key)];
}

// ─── Prim's MST ───────────────────────────────────────────────────
export function primMST(graph, names) {
  const n = graph.length;
  const inMST = Array(n).fill(false);
  const key   = Array(n).fill(Infinity);
  const parent= Array(n).fill(-1);
  key[0] = 0;
  const edges = [];
  for (let c = 0; c < n - 1; c++) {
    let u = -1;
    for (let v = 0; v < n; v++) if (!inMST[v] && (u === -1 || key[v] < key[u])) u = v;
    inMST[u] = true;
    if (parent[u] !== -1) edges.push({ from: names[parent[u]], to: names[u], weight: graph[parent[u]][u] });
    for (let v = 0; v < n; v++)
      if (graph[u][v] && !inMST[v] && graph[u][v] < key[v]) { key[v] = graph[u][v]; parent[v] = u; }
  }
  return edges;
}

// ─── Kruskal's MST ────────────────────────────────────────────────
export function kruskalMST(edges, n) {
  const parent = Array.from({length: n}, (_, i) => i);
  const find = x => parent[x] === x ? x : (parent[x] = find(parent[x]));
  const union = (a, b) => { parent[find(a)] = find(b); };
  const sorted = [...edges].sort((a, b) => a.weight - b.weight);
  const mst = [];
  for (const e of sorted) {
    if (find(e.u) !== find(e.v)) { union(e.u, e.v); mst.push(e); }
  }
  return mst;
}

// ─── Floyd-Warshall ───────────────────────────────────────────────
export function floydWarshall(graph) {
  const n = graph.length;
  const dist = graph.map(row => row.map(v => v === 0 ? Infinity : v));
  for (let i = 0; i < n; i++) dist[i][i] = 0;
  for (let k = 0; k < n; k++)
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++)
        if (dist[i][k] + dist[k][j] < dist[i][j]) dist[i][j] = dist[i][k] + dist[k][j];
  return dist;
}

// ─── 0/1 Knapsack ─────────────────────────────────────────────────
export function knapsack(products, capacity, useWeight = false) {
  const n = products.length;
  const dp = Array.from({length: n+1}, () => Array(capacity+1).fill(0));
  for (let i = 1; i <= n; i++) {
    const p = products[i-1];
    const w = useWeight ? p.weight : Math.floor(p.price);
    for (let c = 0; c <= capacity; c++) {
      dp[i][c] = dp[i-1][c];
      if (w <= c && dp[i-1][c-w] + p.value > dp[i][c]) dp[i][c] = dp[i-1][c-w] + p.value;
    }
  }
  const selected = [];
  let c = capacity;
  for (let i = n; i > 0 && c > 0; i--) {
    if (dp[i][c] !== dp[i-1][c]) {
      selected.push(products[i-1]);
      c -= useWeight ? products[i-1].weight : Math.floor(products[i-1].price);
    }
  }
  return { selected: selected.reverse(), totalValue: dp[n][capacity] };
}

// ─── Subset Sum (Branch & Bound) ──────────────────────────────────
export function subsetSum(products, target) {
  const results = [];
  const sorted = [...products].sort((a, b) => a.price - b.price);
  function bb(idx, current, currentSum) {
    if (Math.abs(currentSum - target) < 0.01) { results.push([...current]); return; }
    if (idx >= sorted.length || currentSum > target) return;
    let remaining = sorted.slice(idx).reduce((s, p) => s + p.price, 0);
    if (currentSum + remaining < target) return;
    bb(idx+1, [...current, sorted[idx]], currentSum + sorted[idx].price);
    bb(idx+1, current, currentSum);
  }
  bb(0, [], 0);
  return results;
}
