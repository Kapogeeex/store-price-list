import React, { useState, useEffect } from 'react';

export default function CurrencySelector({ selected, onChange }) {
  const [rates, setRates] = useState({ GHS: 1, USD: 0.091, EUR: 0.084 });

  useEffect(() => {
    // Optionally fetch live exchange rates here
  }, []);

  return (
    <div className="mb-4">
      <label className="mr-2">Currency:</label>
      <select value={selected} onChange={e => onChange(e.target.value)} className="border p-2">
        {Object.keys(rates).map(cur => <option key={cur} value={cur}>{cur}</option>)}
      </select>
    </div>
  );
}