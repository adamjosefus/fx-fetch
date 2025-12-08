import { dual } from 'effect/Function';
import { urlToUrlIntermediate } from './inputToUrlIntermediate';
import { makeFromUrlIntermediate } from './makeFromUrlIntermediate';
import { SearchParamsInput } from './SearchParamsInput';
import { inputToSearchParamValueIntermediate } from './SearchParamValueIntermediate';
import * as Url from './Url';

function setSearchParamsFn(url: Url.Url, params: SearchParamsInput): Url.Url {
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
 * Sets multiple search parameters on a Url.
 *
 * @example
 * ```ts
 * import { Url } from 'fx-fetch';
 *
 * const url = Url.make('https://api.example.com');
 * const urlWithParams = Url.setSearchParams(url, { page: '1', limit: '10' });
 * ```
 *
 * @category Combinators
 * @since 0.1.0
 */
export const setSearchParams: {
  /**
   * Sets multiple search parameters on a Url.
   *
   * @example
   * ```ts
   * import { Url } from 'fx-fetch';
   *
   * const url = Url.make('https://api.example.com');
   * const urlWithParams = Url.setSearchParams(url, { page: '1', limit: '10' });
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (url: Url.Url, params: SearchParamsInput): Url.Url;

  /**
   * Sets multiple search parameters on a Url.
   *
   * @example
   * ```ts
   * import { Url } from 'fx-fetch';
   * import { pipe } from 'effect';
   *
   * const url = Url.make('https://api.example.com');
   * const urlWithParams = pipe(
   *   url,
   *   Url.setSearchParams({ page: '1', limit: '10' })
   * );
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (params: SearchParamsInput): (url: Url.Url) => Url.Url;
} = dual(2, setSearchParamsFn);
