/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock("./models/wines", () => {
  const wines = [{
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
    {
      name: "Conde de Caralt",
      vintage: "NV",
      country: "Spanien",
      region: "Torrelavit",
      price: 100,
      amount: 2,
      tasting: "Spanien"
    }];
  return {
    getAllWines: jest.fn(() => Promise.resolve(wines))
  };
});

jest.mock("./components/WineList", () => "WineList");
jest.mock("./components/WineForm", () => "WineForm");

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/la empresa/i);
  expect(linkElement).toBeInTheDocument();
});
