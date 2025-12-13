import { Headers } from '../utils/Headers';
import { headersGetAll } from '../utils/headersGetAll';
import * as Response from './Response';

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
 * const headers = Response.getHeaders(response);
 * console.log(headers);
 * ```
 *
 * @category Getters
 * @since 0.1.0
 */
export const getHeaders = (self: Response.Response): Headers => headersGetAll(self.headers);
