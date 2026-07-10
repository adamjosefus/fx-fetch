/**
 * Represents immutable URL search parameters.
 *
 * @category Models
 * @since 2.0.0
 */
export type SearchParams = ReadonlyMap<string, readonly string[]>;

/**
 * @category Models
 * @since 2.0.0
 */
export type ValueElement = string | bigint | number | undefined;

/**
 * @category Models
 * @since 2.0.0
 */
export type Value = ValueElement | readonly ValueElement[];

/**
 * @category Models
 * @since 2.0.0
 */
export type Input<T> =
  | { readonly [key: string]: Value }
  | readonly (readonly [key: string, value: Value])[]
  | ReadonlyMap<string, Value>
  | T;
