import * as Request from './Request';

/**
 * Gets the credentials mode of the request.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 *
 * const request = Request.make({ url: 'https://api.example.com', credentials: 'include' });
 * const credentials = Request.getCredentials(request);
 * console.log(credentials); // 'include'
 * ```
 *
 * @category Getters
 * @since 0.1.0
 */
export const getCredentials = (self: Request.Request): globalThis.RequestCredentials | undefined =>
  self.credentials;
