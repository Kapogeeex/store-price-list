import React, { useEffect, useState, useContext } from 'react';
import { loadLocal, saveLocal, syncToFirebase, syncToSupabase } from './db';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import Summary from './components/Summary';
import Reports from './components/Reports';
import SearchFilter from './components/SearchFilter';
import BarcodeScanner from './components/BarcodeScanner';
import CurrencySelector from './components/CurrencySelector';
import { ThemeContext } from './context/ThemeContext';

function App() {
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('GHS');
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    loadLocal().then(list => {
      setItems(list);
      setFiltered(list);
    });
  }, []);

  useEffect(() => {
    saveLocal(items);
    // syncToFirebase(items);
    // syncToSupabase(items);
    setFiltered(items);
  }, [items]);

  const addItem = item => setItems(prev => [...prev, item]);
  const updateItem = (id, data) => setItems(prev => prev.map(it => (it.id === id ? { ...it, ...data } : it)));
  const deleteItem = id => setItems(prev => prev.filter(it => it.id !== id));
  const addScannedItem = item => setItems(prev => [...prev, item]);
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <div className="max-w-xl mx-auto p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Store Price List</h1>
        <button onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </header>
      <CurrencySelector selected={selectedCurrency} onChange={setSelectedCurrency} />
      <SearchFilter items={items} onFilter={setFiltered} />
      <ItemForm onAdd={addItem} />
      <BarcodeScanner onDetect={addScannedItem} />
      <ItemList items={filtered} onUpdate={updateItem} onDelete={deleteItem} />
      <Summary items={filtered} currency={selectedCurrency} />
      <Reports data={filtered} currency={selectedCurrency} />
    </div>
  );
}

export default App;