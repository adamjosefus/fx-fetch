import { dual } from 'effect/Function';
import type { Url } from '../Url';
import { urlToUrlIntermediate } from '../Url/inputToUrlIntermediate';
import { requestToRequestIntermediate } from './inputToRequestIntermediate';
import { makeFromRequestIntermediate } from './makeFromRequestIntermediate';
import type { Request } from './Request';

function mapUrlFn(self: Request, fn: (url: Url) => Url): Request {
  const prevUrl = self.url;
  const nextUrl = fn(prevUrl);

  const intermediate = requestToRequestIntermediate(self);
  intermediate.clonedUrl = urlToUrlIntermediate(nextUrl);

  return makeFromRequestIntermediate(intermediate);
}

// TODO: Add tests

/**
 * Maps over the URL of a Request.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 * import { Url } from 'fx-fetch';
 *
 * const request = Request.make({ url: 'https://api.example.com' });
 * const mappedRequest = Request.mapUrl(request, (url) => Url.appendPath(url, '/users'));
 * ```
 *
 * @category Mapping
 * @since 0.1.0
 */
export const mapUrl: {
  /**
   * Maps over the URL of a Request.
   *
   * @example
   * ```ts
   * import { Request } from 'fx-fetch';
   * import { Url } from 'fx-fetch';
   *
   * const request = Request.make({ url: 'https://api.example.com' });
   * const mappedRequest = Request.mapUrl(request, (url) => Url.appendPath(url, '/users'));
   * ```
   *
   * @category Mapping
   * @since 0.1.0
   */
  (self: Request, fn: (url: Url) => Url): Request;
  /**
   * Maps over the URL of a Request.
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
   *   Request.mapUrl((url) => Url.appendPath(url, '/users'))
   * );
   * ```
   *
   * @category Mapping
   * @since 0.1.0
   */
  (fn: (url: Url) => Url): (self: Request) => Request;
} = dual(2, mapUrlFn);
