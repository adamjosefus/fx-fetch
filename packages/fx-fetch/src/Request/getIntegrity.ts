import * as Request from './Request';

/**
 * Gets the integrity value of the request.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 *
 * const request = Request.make({
 *   url: 'https://api.example.com',
 *   integrity: 'sha256-abcdef1234567890'
 * });
 * const integrity = Request.getIntegrity(request);
 * console.log(integrity); // 'sha256-abcdef1234567890'
 * ```
 *
 * @category Getters
 * @since 0.1.0
 */
export const getIntegrity = (self: Request.Request): string | undefined => self.integrity;
