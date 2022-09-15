import { render, screen } from '@testing-library/react';
import WineList from './WineList';

const listOfWines = [
    {
        name: "Faustino I",
        vintage: 2008,
        country: "Spanien",
        region: "Rioja",
        price: 199,
        amount: 1,
        tasting: "Spanien"
    },
    {
        name: "Faustino I",
        vintage: 2009,
        country: "Spanien",
        region: "Rioja",
        price: 199,
        amount: 1,
        tasting: "Spanien"
    },
];

test('renders Faustino wines', () => {
    render(<WineList wines={listOfWines} />);
    const wineElements = screen.getAllByText(/faustino i/i);
    expect(wineElements).toHaveLength(2);
});
