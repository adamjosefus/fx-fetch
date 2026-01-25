import { dual } from 'effect/Function';
import { setSearchParam } from '../Url';
import type { SearchParamValueInput } from '../Url/SearchParamValueInput';
import { mapUrl } from './mapUrl';
import type { Request } from './Request';

function setUrlSearchParamFn(self: Request, key: string, value: SearchParamValueInput): Request {
  return mapUrl(self, (url) => setSearchParam(url, key, value));
}

/**
 * Sets a search parameter in the URL of a Request.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 *
 * const request = Request.make({ url: 'https://api.example.com' });
 * const requestWithParam = Request.setUrlSearchParam(request, 'page', '1');
 * ```
 *
 * @category Combinators
 * @since 0.1.0
 */
export const setUrlSearchParam: {
  /**
   * Sets a search parameter in the URL of a Request.
   *
   * @example
   * ```ts
   * import { Request } from 'fx-fetch';
   *
   * const request = Request.make({ url: 'https://api.example.com' });
   * const requestWithParam = Request.setUrlSearchParam(request, 'page', '1');
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (self: Request, key: string, value: SearchParamValueInput): Request;
  /**
   * Sets a search parameter in the URL of a Request.
   *
   * @example
   * ```ts
   * import { Request } from 'fx-fetch';
   * import { pipe } from 'effect';
   *
   * const request = Request.make({ url: 'https://api.example.com' });
   *
   * const requestWithParam = pipe(
   *   request,
   *   Request.setUrlSearchParam('page', '1')
   * );
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (key: string, value: SearchParamValueInput): (self: Request) => Request;
} = dual(3, setUrlSearchParamFn);
