import { formatUrlUntrusted } from './formatUrlUntrusted';
import { urlToUrlIntermediate } from './inputToUrlIntermediate';
import type { Url } from './Url';

/**
 * Converts a Url.Url to a string.
 *
 * @example
 * ```ts
 * import { Url } from 'fx-fetch';
 *
 * const url = Url.make('https://api.example.com/users');
 * const urlString = Url.format(url); // 'https://api.example.com/users'
 * ```
 *
 * @category Conversions
 * @since 0.1.0
 */
export function format(url: Url): string {
  const intermediate = urlToUrlIntermediate(url);

  // We can trust to our inputs because they are validated and normalized from the start
  return formatUrlUntrusted(intermediate);
}
