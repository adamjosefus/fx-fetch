/**
 * Represents immutable HTTP headers as a read-only multimap. Keys are lowercased
 * (header names are case-insensitive); each key maps to its ordered values.
 *
 * @category Models
 * @since 0.1.0
 */
export type Headers = ReadonlyMap<string, readonly string[]>;

/**
 * A single header value on input: one string, a list of strings, or a blank
 * (`null` / `undefined`) which is skipped.
 *
 * @category Models
 * @since 0.1.0
 */
export type Value = readonly string[] | string | null | undefined;

/**
 * Input accepted when constructing {@link Headers}: a record, a `ReadonlyMap`, an
 * array of `[key, value]` pairs, or any iterable of such pairs. Native DOM
 * `Headers` / `HeadersInit` are intentionally not accepted in the core module.
 *
 * @category Models
 * @since 0.1.0
 */
export type Input =
  | Readonly<Record<string, Value>>
  | Iterable<readonly [string, Value]>
  | ReadonlyMap<string, Value>
  | readonly (readonly [key: string, value: Value])[];
