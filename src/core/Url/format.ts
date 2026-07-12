import { format as formatSearchParams } from './SearchParams/format.js';
import type { Url } from './Url.js';

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
  const urlString = [
    url.protocol,
    '//',
    url.username !== undefined ? globalThis.encodeURIComponent(url.username) : '',
    url.password !== undefined ? `:${globalThis.encodeURIComponent(url.password)}` : '',
    url.username !== undefined ? '@' : '',
    url.hostname,
    url.port !== undefined ? `:${url.port}` : '',
    url.pathname !== undefined ? `/${url.pathname}` : '/',
    url.searchParams.size > 0 ? `?${formatSearchParams(url.searchParams)}` : '',
    url.hash !== undefined ? `#${url.hash}` : '',
  ].join('');

  return urlString;
}
