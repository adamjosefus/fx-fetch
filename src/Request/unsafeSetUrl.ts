import { Either } from 'effect';
import { dual } from 'effect/Function';
import * as Url from '../Url';
import { inputToUrlIntermediate } from '../Url/inputToUrlIntermediate';
import { requestToRequestIntermediate } from './inputToRequestIntermediate';
import { makeFromRequestIntermediate } from './makeFromRequestIntermediate';
import * as Request from './Request';

function unsafeSetUrlFn(self: Request.Request, url: Url.Url.Input): Request.Request {
  const urlResult = inputToUrlIntermediate(url);

  if (Either.isLeft(urlResult)) {
    throw urlResult.left;
  }

  const intermediate = requestToRequestIntermediate(self);
  intermediate.clonedUrl = urlResult.right;

  return makeFromRequestIntermediate(intermediate);
}

// TODO: Add tests for dual APIs
// TODO: Add examples

/**
 * Unsafely sets the URL of a Request (throws on invalid).
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 *
 * const request = Request.make({ url: 'https://api.example.com' });
 * const requestWithNewUrl = Request.unsafeSetUrl(request, 'https://api.newdomain.com');
 * ```
 *
 * @category Combinators
 * @since 0.1.0
 */
export const unsafeSetUrl: {
  /**
   * Unsafely sets the URL of a Request (throws on invalid).
   *
   * @example
   * ```ts
   * import { Request } from 'fx-fetch';
   *
   * const request = Request.make({ url: 'https://api.example.com' });
   * const requestWithNewUrl = Request.unsafeSetUrl(request, 'https://api.newdomain.com');
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (self: Request.Request, url: Url.Url.Input): Request.Request;
  /**
   * Unsafely sets the URL of a Request (throws on invalid).
   *
   * @example
   * ```ts
   * import { Request } from 'fx-fetch';
   * import { pipe } from 'effect';
   *
   * const request = Request.make({ url: 'https://api.example.com' });
   *
   * const requestWithNewUrl = pipe(
   *   request,
   *   Request.unsafeSetUrl('https://api.newdomain.com')
   * );
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (url: Url.Url.Input): (self: Request.Request) => Request.Request;
} = dual(2, unsafeSetUrlFn);
