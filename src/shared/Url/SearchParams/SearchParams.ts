/**
 * Represents immutable URL search parameters.
 *
 * @category Models
 * @since 2.0.0
 */
export type SearchParams = ReadonlyMap<string, readonly string[]>;

export namespace SearchParams {
  /**
   * @category Models
   * @since 2.0.0
   */
  export type Value = string | number | undefined | readonly (string | number | undefined)[];

  /**
   * @category Models
   * @since 2.0.0
   */
  export type Input =
    | { readonly [key: string]: Value }
    | readonly (readonly [key: string, value: Value])[]
    | ReadonlyMap<string, Value>
    | string;
}
