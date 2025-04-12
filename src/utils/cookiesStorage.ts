/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";
import { ALL_KEYS } from "./keys";

export type KeyType = keyof typeof ALL_KEYS;

export function writeInCookies(key: KeyType, data: any) {
  if (typeof window === "undefined") {
    return;
  }

  const keyValue = ALL_KEYS[key];

  Cookies.set(keyValue, JSON.stringify(data));
}

export function readFromCookies(key: KeyType) {
  if (typeof window === "undefined") {
    return;
  }

  const keyValue = ALL_KEYS[key];
  const storedData = Cookies.get(keyValue);

  return storedData ? JSON.parse(storedData) : null;
}
