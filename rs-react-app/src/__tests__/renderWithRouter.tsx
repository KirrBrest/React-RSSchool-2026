import { render, type RenderOptions } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import { PersonDetailsPanel } from '../pages/PersonDetailsPanel';

export function renderWithRouter(
  initialPath = '/?page=1',
  options?: Omit<RenderOptions, 'wrapper'>
) {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <App />,
        children: [{ path: 'details', element: <PersonDetailsPanel /> }],
      },
    ],
    { initialEntries: [initialPath] }
  );
  return render(<RouterProvider router={router} />, options);
}
