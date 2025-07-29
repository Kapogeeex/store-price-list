import React from 'react';

export default function ItemList({ items, onUpdate, onDelete }) {
  return (
    <table className="w-full mb-4">
      <thead>
        <tr className="border-b">
          <th className="text-left p-2">Name</th>
          <th className="p-2">Category</th>
          <th className="p-2">Qty</th>
          <th className="p-2">Unit (GHS)</th>
          <th className="p-2">Stock</th>
          <th className="p-2">Total (GHS)</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map(({ id, name, category, quantity, unitPrice, stockLevel }) => {
          const lineTotal = (quantity * unitPrice).toFixed(2);
          return (
            <tr key={id} className="hover:bg-gray-50">
              <td className="p-2">{name}</td>
              <td className="p-2">{category}</td>
              <td className="p-2">{quantity}</td>
              <td className="p-2">{unitPrice.toFixed(2)}</td>
              <td className="p-2">{stockLevel}</td>
              <td className="p-2">{lineTotal}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => {
                    const newQty = prompt('Qty:', quantity);
                    if (newQty) onUpdate(id, { quantity: +newQty });
                  }}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button onClick={() => onDelete(id)} className="text-red-600">
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
); }