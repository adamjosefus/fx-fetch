import * as Request from './Request';

/**
 * Gets the request mode.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 *
 * const request = Request.make({ url: 'https://api.example.com', mode: 'cors' });
 * const mode = Request.getMode(request);
 * console.log(mode); // 'cors'
 * ```
 *
 * @category Getters
 * @since 0.1.0
 */
export const getMode = (self: Request.Request): globalThis.RequestMode | undefined => self.mode;
