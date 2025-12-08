/**
 * @internal
 */
export type HeadersInput =
  | globalThis.HeadersInit
  | readonly (readonly [string, readonly string[] | string | null | undefined])[]
  | MapIterator<[string, readonly string[] | string | null | undefined]>
  | ReadonlyMap<string, readonly string[] | string | null | undefined>
  | Readonly<Record<string, readonly string[] | string | null | undefined>>
  | undefined;
