import type * as localThis from '../utils/localThis';
import type { Request } from './Request';

/**
 * Gets the cache mode of the request.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 *
 * const request = Request.make({ url: 'https://api.example.com', cache: 'no-cache' });
 * const cache = Request.getCache(request);
 * console.log(cache); // 'no-cache'
 * ```
 *
 * @category Getters
 * @since 0.1.0
 */
export const getCache = (self: Request): localThis.RequestCache | undefined => self.cache;
