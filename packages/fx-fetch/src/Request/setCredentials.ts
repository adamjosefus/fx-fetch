import { dual } from 'effect/Function';
import { requestToRequestIntermediate } from './inputToRequestIntermediate';
import { makeFromRequestIntermediate } from './makeFromRequestIntermediate';
import type { Request } from './Request';

function setCredentialsFn(self: Request, credentials: RequestCredentials): Request {
  const intermediate = requestToRequestIntermediate(self);
  intermediate.credentials = credentials;

  return makeFromRequestIntermediate(intermediate);
}

// TODO: Add tests

/**
 * Sets credentials mode in a request to control how cookies and authorization headers are sent.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 *
 * const request = Request.make({ url: 'https://api.example.com' });
 *
 * // Include credentials (cookies, authorization headers) in cross-origin requests
 * const requestWithCredentials = Request.setCredentials(request, 'include');
 *
 * // Send credentials only for same-origin requests
 * const requestSameOrigin = Request.setCredentials(request, 'same-origin');
 * ```
 *
 * @category Combinators
 * @since 0.1.0
 */
export const setCredentials: {
  /**
   * Sets credentials mode in a request (direct call).
   *
   * @example
   * ```ts
   * import { Request } from 'fx-fetch';
   *
   * const request = Request.make({ url: 'https://api.example.com' });
   * const requestWithCredentials = Request.setCredentials(request, 'include');
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (self: Request, credentials: RequestCredentials): Request;
  /**
   * Sets credentials mode in a request.
   *
   * @example
   * ```ts
   * import { Request } from 'fx-fetch';
   * import { pipe } from 'effect';
   *
   * const request = Request.make({ url: 'https://api.example.com' });
   *
   * const requestWithCredentials = pipe(
   *   request,
   *   Request.setCredentials('include')
   * );
   * ```
   *
   * @category Combinators
   * @since 0.1.0
   */
  (credentials: RequestCredentials): (self: Request) => Request;
} = dual(2, setCredentialsFn);
