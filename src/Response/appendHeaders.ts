import { dual } from 'effect/Function';
import { HeadersInput } from '../utils/HeadersInput';
import { headersIntermediateAppend } from '../utils/headersIntermediateAppend';
import { responseToResponseIntermediate } from './inputToResponseIntermediate';
import { makeFromResponseIntermediate } from './makeFromResponseIntermediate';
import * as Response from './Response';

function appendHeadersFn(self: Response.Response, headers: HeadersInput): Response.Response {
  const intermediate = responseToResponseIntermediate(self);
  headersIntermediateAppend(intermediate.clonedHeaders, headers);

  return makeFromResponseIntermediate(intermediate);
}

// TODO: Add tests

/**
 * Merges new headers into a Response, appending values to existing headers.
 *
 * @example
 * ```ts
 * import { Response } from 'fx-fetch';
 * const response = Response.make({ url: 'https://api.example.com' });
 * const responseWithMergedHeaders = Response.appendHeaders(response, {
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
   * Merges new headers into a Response, appending values to existing headers.
   *
   * @example
   * ```ts
   * import { Response } from 'fx-fetch';
   *
   * const response = Response.make({ url: 'https://api.example.com' });
   * const responseWithMergedHeaders = Response.appendHeaders(response, {
   *   'Authorization': 'Bearer token',
   *   'Content-Type': 'application/json'
   * });
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (self: Response.Response, headers: HeadersInput): Response.Response;
  /**
   * Merges new headers into a Response, appending values to existing headers.
   *
   * @example
   * ```ts
   * import { Response } from 'fx-fetch';
   * import { pipe } from 'effect';
   *
   * const response = Response.make({ url: 'https://api.example.com' });
   *
   * const responseWithMergedHeaders = pipe(
   *   response,
   *   Response.appendHeaders({
   *     'X-API-Version': 'v2',
   *     'X-Client-ID': 'webapp'
   *   })
   * );
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (headers: HeadersInput): (self: Response.Response) => Response.Response;
} = dual(2, appendHeadersFn);
