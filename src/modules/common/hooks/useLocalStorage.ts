/* eslint-disable no-console */
import { useState } from 'react';

type UseLocalStorageType<T> = [T, (value: T | ((value: T) => T)) => void];

export function useLocalStorage<T>(key: string, initialValue: T): UseLocalStorageType<T> {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  function setValue(value: T | ((value: T) => T)) {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  }

  return [storedValue, setValue];
}
