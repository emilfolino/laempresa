import "./winecard.css";

function WineCard({wine}) {
    return (
        <div className="card">
            <p className="fat">{wine.name}</p>
            <p className="slim">{wine.vintage} / {wine.region}, {wine.country}</p>
            {wine.price} kr
        </div>
    );
}

export default WineCard;
