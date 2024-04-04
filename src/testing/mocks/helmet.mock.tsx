import { ReactElement } from 'react';
import { HelmetProvider } from 'react-helmet-async';

export const withHelmet = (children: ReactElement) => {
  return <HelmetProvider>{children}</HelmetProvider>;
};
