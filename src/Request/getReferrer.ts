import * as Request from './Request';

/**
 * Gets the referrer of the request.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 *
 * const request = Request.make({ url: 'https://api.example.com', referrer: 'https://example.com' });
 * const referrer = Request.getReferrer(request);
 * console.log(referrer); // 'https://example.com'
 * ```
 *
 * @category Getters
 * @since 0.1.0
 */
export const getReferrer = (self: Request.Request): string | undefined => self.referrer;
