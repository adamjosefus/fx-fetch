import type { Request } from './Request';

/**
 * Checks if the request is keep-alive.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 *
 * const request = Request.make({ url: 'https://api.example.com', keepalive: true });
 * const keepalive = Request.isKeepalive(request);
 * console.log(keepalive); // true
 * ```
 *
 * @category Getters
 * @since 0.1.0
 */
export const isKeepalive = (self: Request): boolean => self.keepalive;
