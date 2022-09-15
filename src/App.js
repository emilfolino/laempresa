import './App.css';
import { useState, useEffect } from 'react';
import winesModel from './models/wines';

import WineList from './components/WineList';
import WineForm from './components/WineForm';

function App() {
  const [wines, setWines] = useState([]);

  async function fetchWines() {
    const allWines = await winesModel.getAllWines();

    setWines(allWines);
  }

  useEffect(() => {
    (async () => {
      await fetchWines();
    })();
  }, []);

  return (
    <div className="App">
      <header className="header">
        <h1>la empresa</h1>
      </header>
      <main className="main">
        <WineList wines={wines} />
        <WineForm submitFunction={fetchWines} />
      </main>
    </div>
  );
}

export default App;
