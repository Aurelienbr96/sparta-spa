/* eslint-disable import/export */
import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Store } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';

import { RouteOption, withHelmet, withRedux, withRoute } from './mocks';

export type ProvidersRenderOptions = {
  store?: Store;
  route?: RouteOption;
};

export type CustomRenderOptions = {
  providers?: ProvidersRenderOptions;
};

type ComposableProvider = (children: ReactElement, options: ProvidersRenderOptions) => ReactElement;

const providers: ComposableProvider[] = [withRedux, withRoute, withHelmet];

const composeProviders = (children: ReactElement, options: ProvidersRenderOptions) => {
  return providers.reduce((component, provider) => {
    return provider(component, options);
  }, children);
};

const AllTheProviders = (options: ProvidersRenderOptions = {}) => {
  return ({ children }: { children: ReactElement }) => {
    return composeProviders(children, options);
  };
};

const customRender = (ui: ReactElement, options: CustomRenderOptions & Omit<RenderOptions, 'wrapper'> = {}) => {
  const { providers, ...others } = options;
  return { ...render(ui, { wrapper: AllTheProviders(providers), ...others }), user: userEvent.setup() };
};

export * from '@testing-library/react';
export { customRender as render };
