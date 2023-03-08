import { useState, useEffect, useCallback } from "react";
import { set, get } from "idb-keyval";

export function usePersistedState<TState>(key: string, defaultState: TState) {
  const [state, setState] = useState<TState>(defaultState);

  useEffect(() => {
    get<TState>(key)
      .then((retrievedState) => setState(retrievedState ?? defaultState))
      .catch(console.error);
  }, [key, setState, defaultState]);

  const setPersistedValue = useCallback(
    (newValue: TState) => {
      setState(newValue);
      set(key, newValue).catch(console.error);
    },
    [key, setState]
  );

  return [state, setPersistedValue] as const;
}
