import type { Url } from '../Url';
import type * as localThis from '../utils/localThis';
import { format } from './format';

// TODO: Add tests

/**
 * Converts a Url.Url to a native globalThis.URL.
 *
 * @example
 * ```ts
 * import { Url } from 'fx-fetch';
 *
 * const url = Url.make('https://api.example.com');
 * const jsUrl = Url.toJsUrl(url);
 * ```
 *
 * @category Conversions
 * @since 0.1.0
 */
export function toJsUrl(url: Url): localThis.URL {
  return new globalThis.URL(format(url)); // Cannot throw because we validated the input
}
