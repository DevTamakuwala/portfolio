import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

test('renders App without crashing', () => {
  expect(() => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  }).not.toThrow();
});