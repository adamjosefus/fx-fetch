import { dual } from 'effect/Function';
import type { Url } from '../Url';
import type { Request } from './Request';

function flatMapUrlFn(self: Request, fn: (url: Url) => Request): Request {
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
  (request: Request, fn: (url: Url) => Request): Request;
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
  (fn: (url: Url) => Request): (request: Request) => Request;
} = dual(2, flatMapUrlFn);
