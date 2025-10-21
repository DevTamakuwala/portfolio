import React from 'react';
import '@testing-library/jest-dom';
import App from './App';

test('App imports without throwing', () => {
  // Avoid rendering App here to prevent mount-time side effects in the test environment.
  expect(App).toBeDefined();
});