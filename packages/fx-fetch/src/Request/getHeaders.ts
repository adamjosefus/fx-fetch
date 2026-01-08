import type { Headers } from '../utils/Headers';
import { headersGetAll } from '../utils/headersGetAll';
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
 * const headers = Request.getHeaders(request);
 * console.log(headers);
 * ```
 *
 * @category Getters
 * @since 0.1.0
 */
export const getHeaders = (self: Request): Headers => headersGetAll(self.headers);
