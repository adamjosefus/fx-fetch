import * as Url from './Url';

/**
 * Checks if the given value is a Url.
 *
 * @example
 * ```ts
 * import { Url } from 'fx-fetch';
 *
 * const url = Url.make('https://api.example.com');
 *
 * Url.isUrl(url); // true
 * Url.isUrl('not a url'); // false
 * ```
 *
 * @category Guards
 * @since 0.1.0
 */
export function isUrl(value: unknown): value is Url.Url {
  const isObject = typeof value === 'object' && value !== null;

  if (!isObject) {
    return false;
  }

  // biome-ignore lint/suspicious/noExplicitAny: It's safe to use `any` for property detection.
  const hasTypeId = (value as any)[Url.TypeId] === Url.TypeId;
  // biome-ignore lint/suspicious/noExplicitAny: It's safe to use `any` for property detection.
  const hasTag = (value as any)._tag === 'Url';

  return hasTypeId && hasTag;
}
