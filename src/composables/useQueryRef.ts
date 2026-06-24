import { computed, type WritableComputedRef } from "vue";
import { useRoute, useRouter, type LocationQueryValue } from "vue-router";

type QueryType = "string" | "number" | "boolean" | "array";

type QueryValue<T extends QueryType> = T extends "number"
  ? number
  : T extends "boolean"
    ? boolean
    : T extends "array"
      ? string[]
      : string;

export function useQueryRef<const V extends string>(
  key: string,
  settings: { values: readonly V[]; defaultValue: NoInfer<V> },
): WritableComputedRef<V>;
export function useQueryRef<const V extends string>(
  key: string,
  settings: { values: readonly V[]; defaultValue?: undefined },
): WritableComputedRef<V | undefined>;
export function useQueryRef<T extends QueryType = "string">(
  key: string,
  settings: { type?: T; defaultValue: QueryValue<T> },
): WritableComputedRef<QueryValue<T>>;
export function useQueryRef<T extends QueryType = "string">(
  key: string,
  settings?: { type?: T; defaultValue?: QueryValue<T> },
): WritableComputedRef<QueryValue<T> | undefined>;
export function useQueryRef(
  key: string,
  settings?: { type?: QueryType; values?: readonly string[]; defaultValue?: unknown },
): WritableComputedRef<unknown> {
  const route = useRoute();
  const router = useRouter();
  const type = settings?.type ?? "string";
  const values = settings?.values;

  const parse = (raw: LocationQueryValue | LocationQueryValue[] | undefined): unknown => {
    if (type === "array") {
      if (raw == null) return undefined;
      return (Array.isArray(raw) ? raw : [raw]).filter((v): v is string => v != null);
    }
    const single = Array.isArray(raw) ? raw[0] : raw;
    if (single == null) return undefined;
    if (type === "number") {
      const n = Number(single);
      return Number.isNaN(n) ? undefined : n;
    }
    if (type === "boolean") return single === "true" ? true : single === "false" ? false : undefined;
    if (values && !values.includes(single)) return undefined;
    return single;
  };

  const serialize = (val: unknown): string | string[] | undefined => {
    if (val == null) return undefined;
    if (Array.isArray(val)) return val.length ? (val as string[]) : undefined;
    if (typeof val === "string") return val || undefined;
    return String(val);
  };

  return computed({
    get: () => parse(route.query[key]) ?? settings?.defaultValue,
    set: (val: unknown) => router.replace({ query: { ...route.query, [key]: serialize(val) } }),
  });
}
