import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders the title', async () => {
  const { findByText } = render(<App />);
  const title = await findByText(/Giffs App/i);
  expect(title).toBeInTheDocument();
});

