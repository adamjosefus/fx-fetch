import { dual } from 'effect/Function';
import { urlToUrlIntermediate } from './inputToUrlIntermediate';
import { makeFromUrlIntermediate } from './makeFromUrlIntermediate';
import { SearchParamValueInput } from './SearchParamValueInput';
import { inputToSearchParamValueIntermediate } from './SearchParamValueIntermediate';
import * as Url from './Url';

function setSearchParamFn(url: Url.Url, key: string, value: SearchParamValueInput): Url.Url {
  const intermediate = urlToUrlIntermediate(url);

  const normalizedValue = inputToSearchParamValueIntermediate(value);
  const isNotEmpty = normalizedValue !== undefined && normalizedValue.length > 0;

  if (isNotEmpty) {
    // Overwrite existing values
    intermediate.clonedSearchParams.set(key, normalizedValue);
  } else {
    // Remove the key if the value is empty
    intermediate.clonedSearchParams.delete(key);
  }

  return makeFromUrlIntermediate(intermediate);
}

// TODO: Add tests
// TODO: Add tests for dual APIs

/**
 * Sets a search parameter on a Url.
 *
 * @example
 * ```ts
 * import { Url } from 'fx-fetch';
 *
 * const url = Url.make('https://api.example.com');
 * const urlWithParam = Url.setSearchParam(url, 'page', '1');
 * ```
 *
 * @category Combinators
 * @since 0.1.0
 */
export const setSearchParam: {
  /**
   * Sets a search parameter on a Url.
   *
   * @example
   * ```ts
   * import { Url } from 'fx-fetch';
   *
   * const url = Url.make('https://api.example.com');
   * const urlWithParam = Url.setSearchParam(url, 'page', '1');
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (url: Url.Url, key: string, value: SearchParamValueInput): Url.Url;
  /**
   * Sets a search parameter on a Url.
   *
   * @example
   * ```ts
   * import { Url } from 'fx-fetch';
   * import { pipe } from 'effect';
   *
   * const url = Url.make('https://api.example.com');
   * const urlWithParam = pipe(
   *   url,
   *   Url.setSearchParam('page', '1')
   * );
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (key: string, value: SearchParamValueInput): (url: Url.Url) => Url.Url;
} = dual(3, setSearchParamFn);
