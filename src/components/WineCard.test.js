import { render, screen } from '@testing-library/react';
import WineCard from './WineCard';

const testWine = {
    name: "Faustino I",
    vintage: 2008,
    country: "Spanien",
    region: "Rioja",
    price: 199,
    amount: 1,
    tasting: "Spanien"
};

test('renders Faustino wines', () => {
    render(<WineCard wine={testWine} />);
    const wineElements = screen.getByText(/faustino i/i);
    expect(wineElements).toBeInTheDocument();
});




