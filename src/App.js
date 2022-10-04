import './App.css';
import { useState, useEffect } from 'react';
import { io } from "socket.io-client";

import winesModel from './models/wines';

import WineList from './components/WineList';
import WineForm from './components/WineForm';
import Login from './components/Login';
import Cart from './components/Cart';

let sendToSocket = false;

function changeSendToSocket(value) {
  sendToSocket = value;
}

function App() {
  const [wines, setWines] = useState([]);
  const [socket, setSocket] = useState(null);
  const [amounts, setAmounts] = useState({});
  const [token, setToken] = useState("");
  const [cart, setCart] = useState([]);

  async function fetchWines() {
    const allWines = await winesModel.getAllWines(token);

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
}, [token]);

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

    setCart([...cart, id]);
  }

  return (
    <div className="App">
      <header className="header">
        <h1>la empresa</h1>
        {token ? <Cart cart={cart} /> : null}
      </header>
      <main className="main">
        {token ?
          <>
            <WineList wines={wines} amounts={amounts} buy={buy} />
            <WineForm submitFunction={fetchWines} />
          </>
          :
          <Login setToken={setToken} />
        }
      </main>
    </div>
  );
}

export default App;
