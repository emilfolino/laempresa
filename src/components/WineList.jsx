import WineCard from '../components/WineCard';

import "./winelist.css";

function WineList({wines, amounts, buy}) {
    const wineItems = wines.map((wine, index) => {
        return <WineCard
                    wine={wine}
                    key={index}
                    amount={amounts[wine._id]}
                    buy={buy}
                />;
    });

    return (
        <div className="list">
            {wineItems}
        </div>
    );
}

export default WineList;
