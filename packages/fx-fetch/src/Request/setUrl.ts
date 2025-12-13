import { Either, Option } from 'effect';
import { dual } from 'effect/Function';
import * as Url from '../Url';
import { inputToUrlIntermediate } from '../Url/inputToUrlIntermediate';
import { requestToRequestIntermediate } from './inputToRequestIntermediate';
import { makeFromRequestIntermediate } from './makeFromRequestIntermediate';
import * as Request from './Request';

function setUrlFn(self: Request.Request, url: Url.Url.Input): Option.Option<Request.Request> {
  const urlResult = inputToUrlIntermediate(url);

  if (Either.isLeft(urlResult)) {
    return Option.none();
  }

  const intermediate = requestToRequestIntermediate(self);
  intermediate.clonedUrl = urlResult.right;

  return Option.some(makeFromRequestIntermediate(intermediate));
}

// TODO: Add tests

/**
 * Sets the URL of a Request.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 * import { Option } from 'effect';
 *
 * const request = Request.make({ url: 'https://api.example.com' });
 * const requestWithNewUrl = Request.setUrl(request, 'https://api.newdomain.com');
 * ```
 *
 * @category Combinators
 * @since 0.1.0
 */
export const setUrl: {
  /**
   * Sets the URL of a Request.
   *
   * @example
   * ```ts
   * import { Request } from 'fx-fetch';
   * import { Option } from 'effect';
   *
   * const request = Request.make({ url: 'https://api.example.com' });
   * const requestWithNewUrl = Request.setUrl(request, 'https://api.newdomain.com');
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (self: Request.Request, url: Url.Url.Input): Option.Option<Request.Request>;
  /**
   * Sets the URL of a Request.
   *
   * @example
   * ```ts
   * import { Request } from 'fx-fetch';
   * import { Option, pipe } from 'effect';
   *
   * const request = Request.make({ url: 'https://api.example.com' });
   *
   * const requestWithNewUrl = pipe(
   *   request,
   *   Request.setUrl('https://api.newdomain.com')
   * );
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (url: Url.Url.Input): (self: Request.Request) => Option.Option<Request.Request>;
} = dual(2, setUrlFn);
