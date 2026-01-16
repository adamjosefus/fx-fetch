import { dual } from 'effect/Function';
import { urlToUrlIntermediate } from './inputToUrlIntermediate';
import { makeFromUrlIntermediate } from './makeFromUrlIntermediate';
import type { SearchParamValueInput } from './SearchParamValueInput';
import { inputToSearchParamValueIntermediate } from './SearchParamValueIntermediate';
import type { Url } from './Url';

function appendSearchParamFn(url: Url, key: string, value: SearchParamValueInput): Url {
  const normalizedValue = inputToSearchParamValueIntermediate(value);
  if (normalizedValue === undefined) {
    return url; // Skip undefined values
  }

  const intermediate = urlToUrlIntermediate(url);

  const list = intermediate.clonedSearchParams.get(key) ?? [];
  list.push(...normalizedValue);

  if (list.length === 0) {
    return url; // Skip appending empty values
  }

  intermediate.clonedSearchParams.set(key, list);

  return makeFromUrlIntermediate(intermediate);
}

// TODO: Add tests

/**
 * Appends a search parameter to a Url.
 *
 * @example
 * ```ts
 * import { Url } from 'fx-fetch';
 *
 * const url = Url.make('https://api.example.com');
 * const urlWithParam = Url.appendSearchParam(url, 'tag', 'news');
 * ```
 *
 * @category Combinators
 * @since 0.1.0
 */
export const appendSearchParam: {
  /**
   * Appends a search parameter to a Url.
   *
   * @example
   * ```ts
   * import { Url } from 'fx-fetch';
   *
   * const url = Url.make('https://api.example.com');
   * const urlWithParam = Url.appendSearchParam(url, 'tag', 'news');
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (url: Url, key: string, value: SearchParamValueInput): Url;

  /**
   * Appends a search parameter to a Url.
   *
   * @example
   * ```ts
   * import { Url } from 'fx-fetch';
   * import { pipe } from 'effect';
   *
   * const url = Url.make('https://api.example.com');
   * const urlWithParam = pipe(
   *   url,
   *   Url.appendSearchParam('tag', 'news')
   * );
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (key: string, value: SearchParamValueInput): (url: Url) => Url;
} = dual(3, appendSearchParamFn);
