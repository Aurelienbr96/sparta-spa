import { act, renderHook, waitFor } from '@app/testing';

import { useLocalStorage } from '../useLocalStorage';

describe('useLocalStorage', () => {
  describe('getValue', () => {
    afterEach(() => {
      window.localStorage.clear();
    });

    it('Should return default value if store value is invalid', async () => {
      jest.spyOn(console, 'error').mockImplementationOnce(() => {});
      jest.spyOn(console, 'log').mockImplementationOnce(() => {});
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      window.localStorage.setItem('item', (() => {}) as any);

      const { result } = renderHook(() => useLocalStorage('value', 'default value'));
      const [value] = result.current;

      await waitFor(() => {
        expect(value).toBe('default value');
      });
    });

    it('Should initialize with default value if it is not in storage', async () => {
      const { result } = renderHook(() => useLocalStorage('value', 'default value'));
      const [value] = result.current;

      await waitFor(() => {
        expect(value).toBe('default value');
      });
    });
  });

  describe('setValue', () => {
    afterEach(() => {
      window.localStorage.clear();
    });

    it('Should store and return given value', async () => {
      const { result } = renderHook(() => useLocalStorage('value', 'default value'));
      const [, setValue] = result.current;

      act(() => setValue('new value'));
      const [value] = result.current;

      await waitFor(() => {
        expect(value).toBe('new value');
      });
    });

    it('Should accept function to mutate value and store it', async () => {
      const { result } = renderHook(() => useLocalStorage('value', 1));
      const [, setValue] = result.current;

      act(() => setValue((v: number) => v + 1));
      const [value] = result.current;

      await waitFor(() => {
        expect(value).toBe(2);
      });
    });

    it('Should not throw if trying to save invalid value', async () => {
      jest.spyOn(console, 'error').mockImplementationOnce(() => {});
      jest.spyOn(console, 'log').mockImplementationOnce(() => {});
      const { result } = renderHook(() => useLocalStorage('value', 'default value'));
      const [, setValue] = result.current;

      act(() =>
        setValue(() => {
          throw new Error();
        }),
      );
      const [value] = result.current;

      await waitFor(() => {
        expect(value).toBe('default value');
      });
    });
  });
});
