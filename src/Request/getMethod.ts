import { Method } from './Method';
import * as Request from './Request';

/**
 * Gets the HTTP method of the request.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 *
 * const request = Request.make({ url: 'https://api.example.com', method: 'POST' });
 * const method = Request.getMethod(request);
 * console.log(method); // 'POST'
 * ```
 *
 * @category Getters
 * @since 0.1.0
 */
export const getMethod = (self: Request.Request): Method => self.method;
