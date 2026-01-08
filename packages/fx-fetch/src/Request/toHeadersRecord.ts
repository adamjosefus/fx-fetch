import { headersToHeadersRecord } from '../utils/headersToHeadersRecord';
import type { Request } from './Request';

/**
 * Gets the headers of the request.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 *
 * const request = Request.make({
 *   url: 'https://api.example.com',
 *   headers: { 'Content-Type': 'application/json' }
 * });
 * const headers = Request.toHeadersRecord(request);
 * console.log(headers); // { 'content-type': 'application/json' }
 * ```
 *
 * @category Conversions
 * @since 0.1.0
 */
export const toHeadersRecord = (self: Request) => headersToHeadersRecord(self.headers);
