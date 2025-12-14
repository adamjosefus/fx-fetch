import { dual } from 'effect/Function';
import { HeadersInput } from '../utils/HeadersInput';
import { headersIntermediateAppend } from '../utils/headersIntermediateAppend';
import { requestToRequestIntermediate } from './inputToRequestIntermediate';
import { makeFromRequestIntermediate } from './makeFromRequestIntermediate';
import * as Request from './Request';

function appendHeadersFn(self: Request.Request, headers: HeadersInput): Request.Request {
  const intermediate = requestToRequestIntermediate(self);
  headersIntermediateAppend(intermediate.clonedHeaders, headers);

  return makeFromRequestIntermediate(intermediate);
}

// TODO: Add tests

/**
 * Merges new headers into a Request, appending values to existing headers.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 *
 * const request = Request.make({ url: 'https://api.example.com' });
 * const requestWithMergedHeaders = Request.appendHeaders(request, {
 *   'Authorization': 'Bearer token',
 *   'Content-Type': 'application/json'
 * });
 * ```
 *
 * @category Combinators
 * @since 0.1.0
 */
export const appendHeaders: {
  /**
   * Merges new headers into a Request, appending values to existing headers.
   *
   * @example
   * ```ts
   * import { Request } from 'fx-fetch';
   *
   * const request = Request.make({ url: 'https://api.example.com' });
   * const requestWithMergedHeaders = Request.appendHeaders(request, {
   *   'Authorization': 'Bearer token',
   *   'Content-Type': 'application/json'
   * });
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (self: Request.Request, headers: HeadersInput): Request.Request;
  /**
   * Merges new headers into a Request, appending values to existing headers.
   *
   * @example
   * ```ts
   * import { Request } from 'fx-fetch';
   * import { pipe } from 'effect';
   *
   * const request = Request.make({ url: 'https://api.example.com' });
   *
   * const requestWithMergedHeaders = pipe(
   *   request,
   *   Request.appendHeaders({
   *     'X-API-Version': 'v2',
   *     'X-Client-ID': 'webapp'
   *   })
   * );
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (headers: HeadersInput): (self: Request.Request) => Request.Request;
} = dual(2, appendHeadersFn);
