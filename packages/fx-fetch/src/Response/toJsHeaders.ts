import { headersToJsHeaders } from '../utils/headersToJsHeaders';
import { getHeaders } from './getHeaders';
import type { Response } from './Response';

/**
 * Converts a Response's headers to a standard JavaScript Headers object.
 *
 * @example
 * ```ts
 * import { Response } from 'fx-fetch';
 *
 * const response = Response.create('GET', '/api/users', {
 *   'Content-Type': 'application/json',
 *   'Authorization': 'Bearer token123'
 * });
 *
 * const headers = toJsHeaders(response);
 * console.log(headers.get('Content-Type')); // 'application/json'
 * ```
 *
 * @since 0.1.0
 * @category Conversions
 */
export function toJsHeaders(self: Response): globalThis.Headers {
  return self.pipe(getHeaders, headersToJsHeaders);
}
