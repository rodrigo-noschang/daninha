/* eslint-disable @typescript-eslint/no-explicit-any */
import { ALL_KEYS } from "./keys";

export type KeyType = keyof typeof ALL_KEYS;

export function writeInLocalStorage(key: KeyType, data: any) {
  if (typeof window === "undefined") {
    return;
  }

  const keyValue = ALL_KEYS[key];

  window.localStorage.setItem(keyValue, JSON.stringify(data));
}

export function readFromLocalStorage(key: KeyType) {
  if (typeof window === "undefined") {
    return;
  }

  const keyValue = ALL_KEYS[key];
  const storedData = window.localStorage.getItem(keyValue);

  return storedData ? JSON.parse(storedData) : null;
}
