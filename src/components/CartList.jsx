import { useState, useEffect } from "react";


export default function CartList({cart}) {
    const [listOfNames, setListOfNames] = useState([]);

    useEffect(() => {
        (async () => {
            let tmpList = [];
            for (let i = 0; i < cart.length; i++) {
                const item = cart[i];
                const response = await fetch('http://localhost:8976/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({ query: `{  wine(id: "${item}") { name }}` })
                });

                const result = await response.json();

                tmpList.push(result.data.wine.name);
            }

            setListOfNames(tmpList);
        })();
    }, []);

    let list = listOfNames.map((name) => <p>{name}</p>);

    return (
        <div className="list">
            {list}
        </div>
    );
}
