import { headersIntermediateClear } from '../utils/headersIntermediateClear';
import { responseToResponseIntermediate } from './inputToResponseIntermediate';
import { makeFromResponseIntermediate } from './makeFromResponseIntermediate';
import * as Response from './Response';

// TODO: Add tests

/**
 * Clears all headers from a Response.
 *
 * @example
 * ```ts
 * import { Response } from 'fx-fetch';
 *
 * const response = Response.make({ url: 'https://api.example.com' });
 * const responseWithoutHeaders = Response.clearHeaders(response);
 * ```
 *
 * @category Combinators
 * @since 0.1.0
 */
export function clearHeaders(self: Response.Response): Response.Response {
  const intermediate = responseToResponseIntermediate(self);
  headersIntermediateClear(intermediate.clonedHeaders);

  return makeFromResponseIntermediate(intermediate);
}
