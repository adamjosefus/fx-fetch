import { NormalizedReferrerPolicy } from './NormalizedReferrerPolicy';
import type { Request } from './Request';

/**
 * Gets the referrer policy of the request.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 *
 * const request = Request.make({
 *   url: 'https://api.example.com',
 *   referrerPolicy: 'strict-origin-when-cross-origin'
 * });
 * const referrerPolicy = Request.getReferrerPolicy(request);
 * console.log(referrerPolicy); // 'strict-origin-when-cross-origin'
 * ```
 *
 * @category Getters
 * @since 0.1.0
 */
export const getReferrerPolicy = (self: Request): NormalizedReferrerPolicy | undefined =>
  self.referrerPolicy;
