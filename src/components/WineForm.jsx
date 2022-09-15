import { useState} from 'react';
import winesModel from '../models/wines';

import "./wineform.css";

function WineForm({submitFunction}) {
    const [newWine, setNewWine] = useState({});

    function changeHandler(event) {
        let newObject = {};

        newObject[event.target.name] = event.target.value;

        setNewWine({...newWine, ...newObject});
    }

    async function saveWine() {
        await winesModel.saveWine(newWine);

        submitFunction();
    }

    return (
        <div>
            <label>Namn:</label>
            <input onChange={changeHandler} name="name" />

            <label>Årgång:</label>
            <input onChange={changeHandler} name="vintage" />

            <label>Antal:</label>
            <input onChange={changeHandler} name="amount" />

            <label>Pris:</label>
            <input onChange={changeHandler} name="price" />

            <button onClick={saveWine}>Spara</button>
        </div>
    );
}

export default WineForm;
