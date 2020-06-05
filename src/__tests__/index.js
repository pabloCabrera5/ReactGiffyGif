import React from 'react';
import { render, waitForElement, fireEvent, screen } from '@testing-library/react';
import App from '../App';

test('renders', async () => {
  const { container } = render(<App />);

  const gifLink = await waitForElement(() =>
    container.querySelector('.Gif-link')
  )
  expect(gifLink).toBeVisible();
});


test('renders the title', async () => {
  const { findByText } = render(<App />);
  const title = await findByText(/Giffs App/i);
  expect(title).toBeInTheDocument();
});

test('search form be ok', async () => {
  render(<App />)
  // we get the input and the button from the search 
  const input = await screen.findByRole('textbox');
  const button = await screen.findByRole('button');
  
  fireEvent.change(input, { target: { value: 'Matrix' } });
  fireEvent.click(button);

  const title = await screen.findByText('Matrix');
  expect(title).toBeVisible();
})



