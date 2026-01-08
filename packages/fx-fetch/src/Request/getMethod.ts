import type { Method } from './Method';
import type { Request } from './Request';

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
export const getMethod = (self: Request): Method => self.method;
