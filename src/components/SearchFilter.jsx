import React, { useState } from 'react';

export default function SearchFilter({ items, onFilter }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [stockThreshold, setStockThreshold] = useState('');

  const applyFilter = () => {
    let filtered = items;
    if (query) filtered = filtered.filter(it => it.name.toLowerCase().includes(query.toLowerCase()));
    if (category) filtered = filtered.filter(it => it.category === category);
    if (stockThreshold) filtered = filtered.filter(it => it.stockLevel <= Number(stockThreshold));
    onFilter(filtered);
  };

  return (
    <div className="mb-4 space-y-2">
      <input
        type="text"
        placeholder="Search name..."
        className="border p-2 w-full"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category..."
        className="border p-2 w-full"
        value={category}
        onChange={e => setCategory(e.target.value)}
      />
      <input
        type="number"
        placeholder="Stock ≤"
        className="border p-2 w-full"
        value={stockThreshold}
        onChange={e => setStockThreshold(e.target.value)}
      />
      <button onClick={applyFilter} className="bg-gray-600 text-white px-4 py-2 rounded">
        Filter
      </button>
    </div>
  );
}