import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Knapsack Capacity Element', () => {
  render(<App />);
  const capacity = screen.getByText(/Knapsack Capacity is/i);
  expect(capacity).toBeInTheDocument();
});
