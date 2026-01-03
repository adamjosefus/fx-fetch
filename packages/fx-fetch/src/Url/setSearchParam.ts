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

/**
 * Sets a search parameter on a Url. If the value is `undefined`, the parameter is removed.
 *
 * @example
 * ```ts
 * import { Url } from 'fx-fetch';
 *
 * const url = Url.unsafeMake({
 *   url: 'https://example.com',
 *   searchParams: {
 *     tag: "new"
 *   },
 * }); // 'https://example.com?tag=new'
 *
 * const updatedUrl = Url.setSearchParam(url, 'tag', 'active'); // 'https://example.com?tag=active'
 * ```
 *
 * @category Combinators
 * @since 0.1.0
 */
export const setSearchParam: {
  /**
   * Sets a search parameter on a Url. If the value is `undefined`, the parameter is removed.
   *
   * @example
   * ```ts
   * import { Url } from 'fx-fetch';
   *
   * const url = Url.unsafeMake({
   *   url: 'https://example.com',
   *   searchParams: {
   *     tag: "new"
   *   },
   * }); // 'https://example.com?tag=new'
   *
   * const updatedUrl = Url.setSearchParam(url, 'tag', 'active'); // 'https://example.com?tag=active'
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (url: Url.Url, key: string, value: SearchParamValueInput): Url.Url;
  /**
   * Sets a search parameter on a Url. If the value is `undefined`, the parameter is removed.
   *
   * @example
   * ```ts
   * import { Url } from 'fx-fetch';
   *
   * const url = Url.unsafeMake({
   *   url: 'https://example.com',
   *   searchParams: {
   *     tag: "new"
   *   },
   * }); // 'https://example.com?tag=new'
   *
   * const updatedUrl = Url.setSearchParam(url, 'tag', 'active'); // 'https://example.com?tag=active'
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (key: string, value: SearchParamValueInput): (url: Url.Url) => Url.Url;
} = dual(3, setSearchParamFn);
