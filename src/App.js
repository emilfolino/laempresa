import './App.css';
import { useState, useEffect } from 'react';
import { io } from "socket.io-client";

import winesModel from './models/wines';

import WineList from './components/WineList';
import WineForm from './components/WineForm';

let sendToSocket = false;

function changeSendToSocket(value) {
  sendToSocket = value;
}

function App() {
  const [wines, setWines] = useState([]);
  const [socket, setSocket] = useState(null);
  const [amounts, setAmounts] = useState({});

  async function fetchWines() {
    const allWines = await winesModel.getAllWines();

    const amountsObject = allWines.reduce((acc, wine) => {
      let tmpObject = {};
      tmpObject[wine._id] = wine.amount;
      return { ...acc, ...tmpObject};
    }, {});

    setAmounts(amountsObject);

    setWines(allWines);
  }

  useEffect(() => {
    (async () => {
      await fetchWines();
    })();
  }, []);

  useEffect(() => {
    console.log(sendToSocket);
    if (socket && sendToSocket) {
      socket.emit("amounts", amounts);
    }

    changeSendToSocket(true);
    console.log(sendToSocket);


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amounts]);

  useEffect(() => {
    setSocket(io("http://localhost:8976"));

    return () => {
      if (socket) {
        socket.disconnect();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("amounts", function (data) {
        changeSendToSocket(false);

        setAmounts(data);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);



  function buy(id, newAmount) {
    const tmpObject = {};

    tmpObject[id] = newAmount;

    setAmounts({...amounts, ...tmpObject});
  }

  return (
    <div className="App">
      <header className="header">
        <h1>la empresa</h1>
      </header>
      <main className="main">
        <WineList wines={wines} amounts={amounts} buy={buy} />
        <WineForm submitFunction={fetchWines} />
      </main>
    </div>
  );
}

export default App;
