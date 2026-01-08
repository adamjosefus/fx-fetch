import type { Request } from './Request';

/**
 * Gets the priority of the request.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 *
 * const request = Request.make({ url: 'https://api.example.com', priority: 'high' });
 * const priority = Request.getPriority(request);
 * console.log(priority); // 'high'
 * ```
 *
 * @category Getters
 * @since 0.1.0
 */
export const getPriority = (self: Request): globalThis.RequestPriority | undefined => self.priority;
