# ShopSmart — Online Shopping App

A full React shopping website with all 8 algorithms from your practical module integrated.

## Setup in VS Code

1. Open this folder in VS Code
2. Open terminal (Ctrl + `)
3. Run:

```
npm install
npm start
```

4. Opens at http://localhost:3000

## Pages

| Page | URL | What it does |
|------|-----|--------------|
| Shop | `/` | Browse all products, filter by category, sort |
| Product | `/product/:id` | Full product detail with related items |
| Cart | `/cart` | Cart with qty controls, checkout |
| Orders | `/orders` | Order history |
| Algorithms | `/algorithms` | Live demo of all 8 algorithms |

## Algorithms Used

| Algorithm | Where |
|-----------|-------|
| Binary Search | Search product by ID |
| Merge Sort | Sort by price / name |
| Quick Sort | Sort by rating |
| Prim's MST | Delivery hub network |
| Kruskal's MST | Alternative MST |
| Floyd-Warshall | All-pairs shortest delivery path |
| 0/1 Knapsack DP | Smart budget optimizer |
| Subset Sum (Branch & Bound) | Exact budget match |

## Tech Stack
- React 18
- React Router v6
- Lucide React (icons)
- Unsplash (product images)
- No backend needed — all data in memory
