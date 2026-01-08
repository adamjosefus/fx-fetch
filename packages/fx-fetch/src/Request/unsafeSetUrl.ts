import { isLeft } from 'effect/Either';
import { dual } from 'effect/Function';
import type { Url } from '../Url';
import { inputToUrlIntermediate } from '../Url/inputToUrlIntermediate';
import { requestToRequestIntermediate } from './inputToRequestIntermediate';
import { makeFromRequestIntermediate } from './makeFromRequestIntermediate';
import type { Request } from './Request';

function unsafeSetUrlFn(self: Request, url: Url.Input): Request {
  const urlResult = inputToUrlIntermediate(url);

  if (isLeft(urlResult)) {
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
  (self: Request, url: Url.Input): Request;
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
  (url: Url.Input): (self: Request) => Request;
} = dual(2, unsafeSetUrlFn);
