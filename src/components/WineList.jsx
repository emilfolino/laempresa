import WineCard from '../components/WineCard';

import "./winelist.css";

function WineList({wines}) {
    const wineItems = wines.map((wine, index) => {
        return <WineCard wine={wine} key={index} />;
    });

    return (
        <div className="list">
            {wineItems}
        </div>
    );
}

export default WineList;
