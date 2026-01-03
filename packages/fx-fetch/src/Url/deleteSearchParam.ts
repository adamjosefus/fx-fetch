import { dual } from 'effect/Function';
import { urlToUrlIntermediate } from './inputToUrlIntermediate';
import { makeFromUrlIntermediate } from './makeFromUrlIntermediate';
import { SearchParamValueInput } from './SearchParamValueInput';
import { inputToSearchParamValueIntermediate } from './SearchParamValueIntermediate';
import * as Url from './Url';

function deleteSearchParamFn(url: Url.Url, key: string, value: SearchParamValueInput): Url.Url {
  const urlIntermediate = urlToUrlIntermediate(url);
  const normalizedValues = inputToSearchParamValueIntermediate(value);

  if (normalizedValues === undefined) {
    // Delete all values by key

    urlIntermediate.clonedSearchParams.delete(key);

    return makeFromUrlIntermediate(urlIntermediate);
  }

  // Delete specific value(s) by key
  const prevList = urlIntermediate.clonedSearchParams.get(key);
  if (prevList === undefined) {
    return url; // Key does not exist, nothing to delete
  }

  const nextList = prevList.filter((v) => !normalizedValues.includes(v));
  if (nextList.length > 0) {
    // Some values remain, update the list
    urlIntermediate.clonedSearchParams.set(key, nextList);
  } else {
    // No values remain, delete the key
    urlIntermediate.clonedSearchParams.delete(key);
  }

  return makeFromUrlIntermediate(urlIntermediate);
}

/**
 * Deletes search parameters from a Url.
 * If a value is provided, only that value is removed; otherwise, all values for the key are removed.
 *
 * @example
 * ```ts
 * import { Url } from 'fx-fetch';
 *
 * const url = Url.make('https://api.example.com?page=1&limit=10');
 * const urlWithoutParam = Url.deleteSearchParam(url, 'page');
 * ```
 *
 * @category Combinators
 * @since 0.1.0
 */
export const deleteSearchParam: {
  /**
   * Deletes search parameters from a Url.
   * If a value is provided, only that value is removed; otherwise, all values for the key are removed.
   *
   * @example
   * ```ts
   * import { Url } from 'fx-fetch';
   *
   * const url = Url.make('https://api.example.com?page=1&limit=10');
   * const urlWithoutParam = Url.deleteSearchParam(url, 'page');
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (url: Url.Url, key: string, value: SearchParamValueInput): Url.Url;
  /**
   * Deletes search parameters from a Url.
   * If a value is provided, only that value is removed; otherwise, all values for the key are removed.
   *
   * @example
   * ```ts
   * import { Url } from 'fx-fetch';
   * import { pipe } from 'effect';
   *
   * const url = Url.make('https://api.example.com?page=1&limit=10');
   * const urlWithoutParam = pipe(
   *   url,
   *   Url.deleteSearchParam('page')
   * );
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (key: string, value: SearchParamValueInput): (url: Url.Url) => Url.Url;
} = dual(3, deleteSearchParamFn);
