import React from 'react';

export default function Summary({ items, currency }) {
  const grand = items.reduce((sum, { quantity, unitPrice }) => sum + quantity * unitPrice, 0).toFixed(2);
  return (
    <div className="text-right font-semibold text-lg">
      Grand Total: {currency} {grand}
    </div>
  );
}