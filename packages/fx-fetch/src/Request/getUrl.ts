import * as Url from '../Url';
import * as Request from './Request';

/**
 * Gets the URL of the request.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 *
 * const request = Request.make({ url: 'https://api.example.com' });
 * const url = Request.getUrl(request);
 * console.log(url);
 * ```
 *
 * @category Getters
 * @since 0.1.0
 */
export const getUrl = (self: Request.Request): Url.Url => self.url;
