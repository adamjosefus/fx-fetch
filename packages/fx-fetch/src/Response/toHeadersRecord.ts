import { headersToHeadersRecord } from '../utils/headersToHeadersRecord';
import type { Response } from './Response';

/**
 * Gets the headers of the response.
 *
 * @example
 * ```ts
 * import { Response } from 'fx-fetch';
 *
 * const response = Response.make({
 *   url: 'https://api.example.com',
 *   headers: { 'Content-Type': 'application/json' }
 * });
 * const headers = Response.toHeadersRecord(response);
 * console.log(headers); // { 'content-type': 'application/json' }
 * ```
 *
 * @category Conversions
 * @since 0.1.0
 */
export const toHeadersRecord = (self: Response) => headersToHeadersRecord(self.headers);
