import { dual } from 'effect/Function';
import { appendSearchParam } from '../Url';
import type { SearchParamValueInput } from '../Url/SearchParamValueInput';
import { mapUrl } from './mapUrl';
import type { Request } from './Request';

function appendUrlSearchParamFn(self: Request, key: string, value: SearchParamValueInput): Request {
  return mapUrl(self, (url) => appendSearchParam(url, key, value));
}

// TODO: Add tests

/**
 * Appends a search parameter to the URL of a Request.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 *
 * const request = Request.make({ url: 'https://api.example.com' });
 * const requestWithParam = Request.appendUrlSearchParam(request, 'page', '1');
 * ```
 *
 * @category Combinators
 * @since 0.1.0
 */
export const appendUrlSearchParam: {
  /**
   * Appends a search parameter to the URL of a Request.
   *
   * @example
   * ```ts
   * import { Request } from 'fx-fetch';
   *
   * const request = Request.make({ url: 'https://api.example.com' });
   * const requestWithParam = Request.appendUrlSearchParam(request, 'page', '1');
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (self: Request, key: string, value: SearchParamValueInput): Request;
  /**
   * Appends a search parameter to the URL of a Request.
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
   *   Request.appendUrlSearchParam('page', '1')
   * );
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (key: string, value: SearchParamValueInput): (self: Request) => Request;
} = dual(3, appendUrlSearchParamFn);
