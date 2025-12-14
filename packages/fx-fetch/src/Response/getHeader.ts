import { dual } from 'effect/Function';
import { headersGetSingle } from '../utils/headersGetSingle';
import * as Response from './Response';

function getHeaderFn(self: Response.Response, name: string) {
  return headersGetSingle(self.headers, name);
}

/**
 * Retrieves the values of a specific header from a Response.
 *
 * @example
 * ```ts
 * import { Response } from 'fx-fetch';
 *
 * const response = Response.make({
 *   url: 'https://api.example.com',
 *   headers: {
 *     'Authorization': 'Bearer token',
 *   },
 * });
 *
 * const authHeader = getHeader(response, 'Authorization');
 * console.log(authHeader); // ['Bearer token']
 * ```
 *
 * @category Getters
 * @since 0.1.0
 */
export const getHeader: {
  /**
   * Retrieves the values of a specific header from a Response.
   *
   * @example
   * ```ts
   * import { Response } from 'fx-fetch';
   *
   * const response = Response.make({
   *   url: 'https://api.example.com',
   *   headers: {
   *     'Authorization': 'Bearer token',
   *   },
   * });
   *
   * const authHeader = getHeader(response, 'Authorization');
   * console.log(authHeader); // ['Bearer token']
   * ```
   *
   * @category Getters
   * @since 0.1.0
   */
  (self: Response.Response, name: string): readonly string[] | undefined;
  /**
   * Retrieves the values of a specific header from a Response.
   *
   * @example
   * ```ts
   * import { Response } from 'fx-fetch';
   *
   * const response = Response.make({
   *   url: 'https://api.example.com',
   *   headers: {
   *     'Authorization': 'Bearer token',
   *   },
   * });
   *
   * const authHeader = response.pipe(
   *   getHeader('Authorization')
   * );
   * console.log(authHeader); // ['Bearer token']
   * ```
   *
   * @category Getters
   * @since 0.1.0
   */
  (name: string): (self: Response.Response) => readonly string[] | undefined;
} = dual(2, getHeaderFn);
