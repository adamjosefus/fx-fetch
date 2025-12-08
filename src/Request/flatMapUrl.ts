import { dual } from 'effect/Function';
import * as Url from '../Url';
import * as Request from './Request';

function flatMapUrlFn(
  self: Request.Request,
  fn: (url: Url.Url) => Request.Request
): Request.Request {
  const nextRequest = fn(self.url);

  return nextRequest;
}

/**
 * Maps over the URL of a Request and returns a new Request.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 * import { Url } from 'fx-fetch';
 *
 * const request = Request.make({ url: 'https://api.example.com' });
 * const mappedRequest = Request.flatMapUrl(request, (url) =>
 *   Request.make({ url: Url.appendPath(url, '/users') })
 * );
 * ```
 *
 * @category Mapping
 * @since 0.1.0
 */
export const flatMapUrl: {
  /**
   * Maps over the URL of a Request and returns a new Request.
   *
   * @example
   * ```ts
   * import { Request } from 'fx-fetch';
   * import { Url } from 'fx-fetch';
   *
   * const request = Request.make({ url: 'https://api.example.com' });
   * const mappedRequest = Request.flatMapUrl(request, (url) =>
   *   Request.make({ url: Url.appendPath(url, '/users') })
   * );
   * ```
   *
   * @category Mapping
   * @since 0.1.0
   */
  (request: Request.Request, fn: (url: Url.Url) => Request.Request): Request.Request;
  /**
   * Maps over the URL of a Request and returns a new Request.
   *
   * @example
   * ```ts
   * import { Request } from 'fx-fetch';
   * import { Url } from 'fx-fetch';
   * import { pipe } from 'effect';
   *
   * const request = Request.make({ url: 'https://api.example.com' });
   *
   * const mappedRequest = pipe(
   *   request,
   *   Request.flatMapUrl((url) =>
   *     Request.make({ url: Url.appendPath(url, '/users') })
   *   )
   * );
   * ```
   *
   * @category Mapping
   * @since 0.1.0
   */
  (fn: (url: Url.Url) => Request.Request): (request: Request.Request) => Request.Request;
} = dual(2, flatMapUrlFn);
