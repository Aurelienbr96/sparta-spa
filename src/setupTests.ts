/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import '@testing-library/jest-dom';
import 'isomorphic-fetch';
// @ts-ignore
global.___loader = {
  enqueue: jest.fn(),
};

const testEnv: Record<string, string> = {
  VITE_API_URL: 'http://localhost',
  NODE_ENV: 'test',
};

jest.mock('./modules/common/utils/env.utils', () => ({
  getEnv: (name: string) => testEnv[name],
}));

jest.mock('./modules/translation/hooks/useTranslation', () => ({
  useTranslation: () => {
    return {
      t: (key: string) => key,
    };
  },
}));
