import { headersIntermediateClear } from '../utils/headersIntermediateClear';
import { requestToRequestIntermediate } from './inputToRequestIntermediate';
import { makeFromRequestIntermediate } from './makeFromRequestIntermediate';
import type { Request } from './Request';

// TODO: Add tests

/**
 * Clears all headers from a Request.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 *
 * const request = Request.make({ url: 'https://api.example.com' });
 * const requestWithoutHeaders = Request.clearHeaders(request);
 * ```
 *
 * @category Combinators
 * @since 0.1.0
 */
export function clearHeaders(self: Request): Request {
  const intermediate = requestToRequestIntermediate(self);
  headersIntermediateClear(intermediate.clonedHeaders);

  return makeFromRequestIntermediate(intermediate);
}
