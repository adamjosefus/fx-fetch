/**
 * @internal
 */
export type HeadersInput =
  | globalThis.Headers
  | MapIterator<[string, readonly string[] | string | null | undefined]>
  | readonly (readonly [string, readonly string[] | string | null | undefined])[]
  | readonly (readonly [string, string])[]
  | Readonly<Record<string, readonly string[] | string | null | undefined>>
  | ReadonlyMap<string, readonly string[] | string | null | undefined>
  | Readonly<Record<string, string>>
  | undefined;
