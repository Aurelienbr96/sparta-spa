import { useEffect, DependencyList } from 'react';

/* istanbul ignore next */
export function useUnload(cb: () => void, deps: DependencyList) {
  useEffect(() => {
    window.addEventListener('beforeunload', cb);
    return () => {
      window.removeEventListener('beforeunload', cb);
    };
  }, deps);
}
