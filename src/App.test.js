import { render, screen } from '@testing-library/react';
import App from './App';

test('renders la empresa header', () => {
  render(<App />);
  const linkElement = screen.getByText(/la empresa/i);
  expect(linkElement).toBeInTheDocument();
});
