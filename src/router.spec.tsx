import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App'; 

describe('App routing', () => {
  test('navigates to beer list on default route', async () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Wait for the lazy-loaded component to be rendered
    await waitFor(() => getByTestId('beer-list-page'));

    expect(getByTestId('beer-list-page')).toBeTruthy();
  });

  test('navigates to beer list page on "/beer-list" route', async () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/beer-list']}>
        <App />
      </MemoryRouter>
    );

    // Wait for the lazy-loaded component to be rendered
    await waitFor(() => getByTestId('beer-list-page')); 

    expect(getByTestId('beer-list-page')).toBeTruthy();
  });

  test('navigates to billing list page on "/bill-list" route', async () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/bill-list']}>
        <App />
      </MemoryRouter>
    );

    // Wait for the lazy-loaded component to be rendered
    await waitFor(() => getByTestId('billing-list-page')); 

    expect(getByTestId('billing-list-page')).toBeTruthy();
  });

  test('displays 404 page for unknown routes', async () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/unknown-route']}>
        <App />
      </MemoryRouter>
    );

    // Wait for the lazy-loaded component to be rendered
    await waitFor(() => getByTestId('404-page')); 

    expect(getByTestId('404-page')).toBeTruthy();
  });
});
