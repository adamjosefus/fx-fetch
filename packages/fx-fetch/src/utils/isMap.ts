/**
 * Type-safe variant of `value instanceof globalThis.Map`. It respects both read-only and mutable maps.
 */
export function isMap<K, V, T extends ReadonlyMap<K, V>>(value: T | unknown): value is T {
  return value instanceof globalThis.Map;
}
