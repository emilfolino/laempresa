import "./winecard.css";

function WineCard({wine, amount, buy}) {
    return (
        <div className="card">
            <p className="fat">{wine.name}</p>
            <p className="slim">{wine.vintage} / {wine.region}, {wine.country}</p>
            <p>{wine.price} kr</p>
            <p>{amount} kvar</p>
            <p>{amount > 0 ? <button onClick={() => buy(wine._id, (amount - 1))}>Köp</button>: "Inga kvar"}</p>
        </div>
    );
}

export default WineCard;
