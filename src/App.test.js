import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Knapsack Capacity Element', () => {
  render(<App />);
  const capacity = screen.getByText(/Knapsack Capacity:/i);
  expect(capacity).toBeInTheDocument();
});
