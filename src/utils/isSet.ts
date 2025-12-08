/**
 * Type-safe variant of `value instanceof globalThis.Set`. It respects both read-only and mutable sets.
 */
export function isSet<V, T extends ReadonlySet<V>>(value: T | unknown): value is T {
  return value instanceof globalThis.Set;
}
