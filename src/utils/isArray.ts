/**
 * Type-safe variant of `Array.isArray`. It respects both read-only and mutable arrays.
 */
export function isArray<V, T extends readonly V[]>(value: T | unknown): value is T {
  return Array.isArray(value);
}
