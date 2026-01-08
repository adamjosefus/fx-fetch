import { isLeft } from 'effect/Either';
import { dual } from 'effect/Function';
import { none, type Option, some } from 'effect/Option';
import type { Url } from '../Url';
import { inputToUrlIntermediate } from '../Url/inputToUrlIntermediate';
import { requestToRequestIntermediate } from './inputToRequestIntermediate';
import { makeFromRequestIntermediate } from './makeFromRequestIntermediate';
import type { Request } from './Request';

function setUrlFn(self: Request, url: Url.Input): Option<Request> {
  const urlResult = inputToUrlIntermediate(url);

  if (isLeft(urlResult)) {
    return none();
  }

  const intermediate = requestToRequestIntermediate(self);
  intermediate.clonedUrl = urlResult.right;

  return some(makeFromRequestIntermediate(intermediate));
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
  (self: Request, url: Url.Input): Option<Request>;
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
  (url: Url.Input): (self: Request) => Option<Request>;
} = dual(2, setUrlFn);
