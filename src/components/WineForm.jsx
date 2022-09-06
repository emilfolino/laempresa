import { useState} from 'react';
import winesModel from '../models/wines';

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
            <input onChange={changeHandler} name="name" />
            <input onChange={changeHandler} name="vintage" />

            <button onClick={saveWine}>Spara</button>
        </div>
    );
}

export default WineForm;
