import { headersToJsHeaders } from '../utils/headersToJsHeaders';
import { getHeaders } from './getHeaders';
import type { Request } from './Request';

/**
 * Converts a Request's headers to a standard JavaScript Headers object.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 *
 * const request = Request.create('GET', '/api/users', {
 *   'Content-Type': 'application/json',
 *   'Authorization': 'Bearer token123'
 * });
 *
 * const headers = toJsHeaders(request);
 * console.log(headers.get('Content-Type')); // 'application/json'
 * ```
 *
 * @since 0.1.0
 * @category Conversions
 */
export function toJsHeaders(self: Request): globalThis.Headers {
  return self.pipe(getHeaders, headersToJsHeaders);
}
