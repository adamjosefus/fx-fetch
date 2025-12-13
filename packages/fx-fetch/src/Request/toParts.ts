import { headersToJsHeaders } from '../utils/headersToJsHeaders';
import { getHeaders } from './getHeaders';
import * as Request from './Request';

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
export function toParts(self: Request.Request): Request.Request.Parts {
  return {
    body: self.body,
    cache: self.cache,
    credentials: self.credentials,
    headers: headersToJsHeaders(getHeaders(self)),
    integrity: self.integrity,
    keepalive: self.keepalive,
    method: self.method,
    mode: self.mode,
    priority: self.priority,
    redirect: self.redirect,
    referrer: self.referrer,
    referrerPolicy: self.referrerPolicy,
    signal: undefined,
    url: self.url.toString(),
  };
}
