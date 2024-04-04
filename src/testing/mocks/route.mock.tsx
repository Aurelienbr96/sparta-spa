import { ReactElement } from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import { ProvidersRenderOptions } from '../testing';

export type RouteOption = { path: string; initial: string };

export const withRoute = (children: ReactElement, options: ProvidersRenderOptions) => {
  if (options.route) {
    return (
      <MemoryRouter initialEntries={[options.route.initial]}>
        <Routes>
          <Route path={options.route.path} element={children} />
        </Routes>
      </MemoryRouter>
    );
  }

  return children;
};
