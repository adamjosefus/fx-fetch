import { dual } from 'effect/Function';
import type { Url } from '../Url';
import { urlToUrlIntermediate } from './inputToUrlIntermediate';
import { makeFromUrlIntermediate } from './makeFromUrlIntermediate';
import type { SearchParamsInput } from './SearchParamsInput';
import { inputToSearchParamValueIntermediate } from './SearchParamValueIntermediate';

function setSearchParamsFn(url: Url, params: SearchParamsInput): Url {
  const intermediate = urlToUrlIntermediate(url);

  for (const [key, value] of Object.entries(params)) {
    const normalizedValue = inputToSearchParamValueIntermediate(value);
    const isNotEmpty = normalizedValue !== undefined && normalizedValue.length > 0;

    if (isNotEmpty) {
      // Overwrite existing values
      intermediate.clonedSearchParams.set(key, normalizedValue);
    } else {
      // Remove the key if the value is empty
      intermediate.clonedSearchParams.delete(key);
    }
  }

  return makeFromUrlIntermediate(intermediate);
}

// TODO: Add tests

/**
 * Sets or updates multiple search parameters in the existing URL's query string.
 *
 * @example
 * ```ts
 * import { Url } from 'fx-fetch';
 *
 * const url = Url.unsafeMake({
 *   url: 'https://example.com',
 *   searchParams: {
 *     tag: ['new', 'sale'],
 *   },
 * });
 *
 * Url.format(url); // 'https://example.com?tag=new&tag=sale'
 *
 * // Set 'tag' parameter to 'active', replacing existing values
 * url.pipe(
 *   Url.setSearchParams({
 *     "tag": "active"
 *   }),
 *   Url.format // 'https://example.com?tag=active'
 * );
 *
 * // Add new 'q' parameter without removing existing ones
 * url.pipe(
 *   Url.setSearchParams({
 *     "q": "Lorem ipsum",
 *   }),
 *   Url.format // 'https://example.com?tag=new&tag=sale&q=Lorem+ipsum'
 * );
 * ```
 *
 * @category Combinators
 * @since 0.1.0
 */
export const setSearchParams: {
  /**
   * Sets or updates multiple search parameters in the existing URL's query string.
   *
   * @example
   * ```ts
   * import { Url } from 'fx-fetch';
   *
   * const url = Url.unsafeMake({
   *   url: 'https://example.com',
   *   searchParams: {
   *     tag: ['new', 'sale'],
   *   },
   * });
   *
   * Url.format(url); // 'https://example.com?tag=new&tag=sale'
   *
   * // Set 'tag' parameter to 'active', replacing existing values
   * url.pipe(
   *   Url.setSearchParams({
   *     "tag": "active"
   *   }),
   *   Url.format // 'https://example.com?tag=active'
   * );
   *
   * // Add new 'q' parameter without removing existing ones
   * url.pipe(
   *   Url.setSearchParams({
   *     "q": "Lorem ipsum",
   *   }),
   *   Url.format // 'https://example.com?tag=new&tag=sale&q=Lorem+ipsum'
   * );
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (url: Url, params: SearchParamsInput): Url;

  /**
   * Sets or updates multiple search parameters in the existing URL's query string.
   *
   * @example
   * ```ts
   * import { Url } from 'fx-fetch';
   *
   * const url = Url.unsafeMake({
   *   url: 'https://example.com',
   *   searchParams: {
   *     tag: ['new', 'sale'],
   *   },
   * });
   *
   * Url.format(url); // 'https://example.com?tag=new&tag=sale'
   *
   * // Set 'tag' parameter to 'active', replacing existing values
   * url.pipe(
   *   Url.setSearchParams({
   *     "tag": "active"
   *   }),
   *   Url.format // 'https://example.com?tag=active'
   * );
   *
   * // Add new 'q' parameter without removing existing ones
   * url.pipe(
   *   Url.setSearchParams({
   *     "q": "Lorem ipsum",
   *   }),
   *   Url.format // 'https://example.com?tag=new&tag=sale&q=Lorem+ipsum'
   * );
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (params: SearchParamsInput): (url: Url) => Url;
} = dual(2, setSearchParamsFn);
