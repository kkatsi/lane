import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isDefined = <T>(v: T | undefined | null): v is T => v !== undefined && v !== null;

export const isArray = <T>(v: unknown): v is T[] => Array.isArray(v);

export const areArraysEqual = <T>(a?: readonly T[] | null, b?: readonly T[] | null) => {
  if (a === b) return true;
  if (!a || !b) return !a?.length && !b?.length;
  return a.length === b.length && a.every((v, i) => v === b[i]);
};

export const isObjectEmpty = (obj: Record<PropertyKey, unknown>) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};
