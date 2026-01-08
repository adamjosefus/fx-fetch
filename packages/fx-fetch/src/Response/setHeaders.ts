import { dual } from 'effect/Function';
import type { HeadersInput } from '../utils/HeadersInput';
import { headersIntermediateSet } from '../utils/headersIntermediateSet';
import { responseToResponseIntermediate } from './inputToResponseIntermediate';
import { makeFromResponseIntermediate } from './makeFromResponseIntermediate';
import type { Response } from './Response';

function setHeadersFn(self: Response, headers: HeadersInput): Response {
  const intermediate = responseToResponseIntermediate(self);
  headersIntermediateSet(intermediate.clonedHeaders, headers);

  return makeFromResponseIntermediate(intermediate);
}

// TODO: Add tests

/**
 * Clears existing headers and sets new headers in a Response.
 *
 * @example
 * ```ts
 * import { Response } from 'fx-fetch';
 *
 * const response = Response.make({ url: 'https://api.example.com' });
 * const responseWithHeaders = Response.setHeaders(response, {
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
   * Clears existing headers and sets new headers in a Response.
   *
   * @example
   * ```ts
   * import { Response } from 'fx-fetch';
   *
   * const response = Response.make({ url: 'https://api.example.com' });
   * const responseWithHeaders = Response.setHeaders(response, {
   *   'Authorization': 'Bearer token',
   *   'Content-Type': 'application/json'
   * });
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (self: Response, headers: HeadersInput): Response;
  /**
   * Clears existing headers and sets new headers in a Response.
   *
   * @example
   * ```ts
   * import { Response } from 'fx-fetch';
   * import { pipe } from 'effect';
   *
   * const response = Response.make({ url: 'https://api.example.com' });
   *
   * const responseWithHeaders = pipe(
   *   response,
   *   Response.setHeaders({
   *     'Authorization': 'Bearer token',
   *     'Content-Type': 'application/json'
   *   })
   * );
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (headers: HeadersInput): (self: Response) => Response;
} = dual(2, setHeadersFn);
