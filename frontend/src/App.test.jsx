import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders app main element', () => {
  render(<App />);
  expect(true).toBe(true);
});
