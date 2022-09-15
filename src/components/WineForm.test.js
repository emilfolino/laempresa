import { render, screen } from '@testing-library/react';
import WineForm from './WineForm';

const faker = jest.fn();

test('renders Faustino wines', () => {
    render(<WineForm submitFunction={faker} />);
    const label = screen.getByText(/namn:/i);
    expect(label).toBeInTheDocument();
});
