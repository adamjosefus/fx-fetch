import { headersToJsHeaders } from '../utils/headersToJsHeaders';
import { getHeaders } from './getHeaders';
import type { Request } from './Request';

/**
 * Converts a Request to its constituent parts as a plain object.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 *
 * const request = Request.unsafeMake({
 *   url: 'https://example.com/api/users',
 *   method: 'GET',
 * });
 *
 * const parts = Request.toParts(request);
 * console.log(parts.url); // { 'url': 'https://example.com/api/users', ... }
 * ```
 *
 * @since 0.1.0
 * @category Conversions
 */
export function toParts(self: Request): Request.Parts {
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
