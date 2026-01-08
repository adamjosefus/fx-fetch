import { dual } from 'effect/Function';
import { HeadersInput } from '../utils/HeadersInput';
import { headersIntermediateSet } from '../utils/headersIntermediateSet';
import { requestToRequestIntermediate } from './inputToRequestIntermediate';
import { makeFromRequestIntermediate } from './makeFromRequestIntermediate';
import type { Request } from './Request';

function setHeadersFn(self: Request, headers: HeadersInput): Request {
  const intermediate = requestToRequestIntermediate(self);
  headersIntermediateSet(intermediate.clonedHeaders, headers);

  return makeFromRequestIntermediate(intermediate);
}

// TODO: Add tests

/**
 * Clears existing headers and sets new headers in a Request.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 *
 * const request = Request.make({ url: 'https://api.example.com' });
 * const requestWithHeaders = Request.setHeaders(request, {
 *   'Authorization': 'Bearer token',
 *   'Content-Type': 'application/json'
 * });
 * ```
 *
 * @category Combinators
 * @since 0.1.0
 */
export const setHeaders: {
  /**
   * Clears existing headers and sets new headers in a Request.
   *
   * @example
   * ```ts
   * import { Request } from 'fx-fetch';
   *
   * const request = Request.make({ url: 'https://api.example.com' });
   * const requestWithHeaders = Request.setHeaders(request, {
   *   'Authorization': 'Bearer token',
   *   'Content-Type': 'application/json'
   * });
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (self: Request, headers: HeadersInput): Request;
  /**
   * Clears existing headers and sets new headers in a Request.
   *
   * @example
   * ```ts
   * import { Request } from 'fx-fetch';
   * import { pipe } from 'effect';
   *
   * const request = Request.make({ url: 'https://api.example.com' });
   *
   * const requestWithHeaders = pipe(
   *   request,
   *   Request.setHeaders({
   *     'Authorization': 'Bearer token',
   *     'Content-Type': 'application/json'
   *   })
   * );
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (headers: HeadersInput): (self: Request) => Request;
} = dual(2, setHeadersFn);
