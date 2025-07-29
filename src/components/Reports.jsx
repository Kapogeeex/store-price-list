import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function Reports({ data, currency }) {
  const categories = [...new Set(data.map(it => it.category || 'Uncategorized'))];
  const stockData = categories.map(cat =>
    data.filter(it => it.category === cat).reduce((sum, it) => sum + it.stockLevel, 0)
  );
  const chartData = {
    labels: categories,
    datasets: [{
      label: `Stock Levels (${currency})`,
      data: stockData
    }]
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Reports</h2>
      <Bar data={chartData} />
    </div>
  );
}