import { dual } from 'effect/Function';
import { headersGetSingle } from '../utils/headersGetSingle';
import * as Request from './Request';

function getHeaderFn(self: Request.Request, name: string) {
  return headersGetSingle(self.headers, name);
}

/**
 * Retrieves the values of a specific header from a Request.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 *
 * const request = Request.make({
 *   url: 'https://api.example.com',
 *   headers: {
 *     'Authorization': 'Bearer token',
 *   },
 * });
 *
 * const authHeader = getHeader(request, 'Authorization');
 * console.log(authHeader); // ['Bearer token']
 * ```
 *
 * @category Getters
 * @since 0.1.0
 */
export const getHeader: {
  /**
   * Retrieves the values of a specific header from a Request.
   *
   * @example
   * ```ts
   * import { Request } from 'fx-fetch';
   *
   * const request = Request.make({
   *   url: 'https://api.example.com',
   *   headers: {
   *     'Authorization': 'Bearer token',
   *   },
   * });
   *
   * const authHeader = getHeader(request, 'Authorization');
   * console.log(authHeader); // ['Bearer token']
   * ```
   *
   * @category Getters
   * @since 0.1.0
   */
  (self: Request.Request, name: string): readonly string[] | undefined;
  /**
   * Retrieves the values of a specific header from a Request.
   *
   * @example
   * ```ts
   * import { Request } from 'fx-fetch';
   *
   * const request = Request.make({
   *   url: 'https://api.example.com',
   *   headers: {
   *     'Authorization': 'Bearer token',
   *   },
   * });
   *
   * const authHeader = request.pipe(
   *   getHeader('Authorization')
   * );
   * console.log(authHeader); // ['Bearer token']
   * ```
   *
   * @category Getters
   * @since 0.1.0
   */
  (name: string): (self: Request.Request) => readonly string[] | undefined;
} = dual(2, getHeaderFn);
