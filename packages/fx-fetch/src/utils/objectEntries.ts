import type { ReadonlyRecord } from './ReadonlyRecord';

/**
 * Type-safe equivalent of `Object.entries` that returns the entries of a record.
 */
export function objectEntriesMutable<K extends PropertyKey, V>(
  record: ReadonlyRecord<K, V>
): [K, V][] {
  return Object.entries(record) as [K, V][];
}

/**
 * Type-safe equivalent of `Object.entries` that returns the entries of a record.
 */
export function objectEntries<K extends PropertyKey, V>(
  record: ReadonlyRecord<K, V>
): readonly (readonly [K, V])[] {
  return Object.freeze(objectEntriesMutable<K, V>(record));
}
