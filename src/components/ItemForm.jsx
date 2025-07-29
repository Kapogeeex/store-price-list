import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function ItemForm({ onAdd }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState('');
  const [stockLevel, setStockLevel] = useState(0);

  const submit = e => {
    e.preventDefault();
    if (!name || !price) return;
    onAdd({ id: uuidv4(), name, category, quantity: +qty, unitPrice: +price, stockLevel: +stockLevel });
    setName(''); setCategory(''); setQty(1); setPrice(''); setStockLevel(0);
  };

  return (
    <form onSubmit={submit} className="mb-6 space-y-2">
      <input
        className="border p-2 w-full"
        placeholder="Item name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Category"
        value={category}
        onChange={e => setCategory(e.target.value)}
      />
      <div className="flex space-x-2">
        <input
          type="number"
          className="border p-2 flex-1"
          min="1"
          value={qty}
          onChange={e => setQty(e.target.value)}
        />
        <input
          type="number"
          className="border p-2 flex-1"
          step="0.01"
          placeholder="Unit price (GHS)"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <input
          type="number"
          className="border p-2 flex-1"
          min="0"
          placeholder="Stock level"
          value={stockLevel}
          onChange={e => setStockLevel(e.target.value)}
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Item
      </button>
    </form>
  );
}