import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const useLocaleStorageState = <T>(
  key: string,
  fallback: T,
): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState<T>(() => {
    const storageItem = localStorage.getItem(key);
    return storageItem ? JSON.parse(storageItem) : fallback;
  });

  const handleSet = (value: T) => {
    setState(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [state, handleSet];
};
