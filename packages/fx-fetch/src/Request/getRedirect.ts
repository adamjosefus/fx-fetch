import type * as localThis from '../utils/localThis';
import type { Request } from './Request';

/**
 * Gets the redirect mode of the request.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 *
 * const request = Request.make({ url: 'https://api.example.com', redirect: 'follow' });
 * const redirect = Request.getRedirect(request);
 * console.log(redirect); // 'follow'
 * ```
 *
 * @category Getters
 * @since 0.1.0
 */
export const getRedirect = (self: Request): localThis.RequestRedirect | undefined => self.redirect;
