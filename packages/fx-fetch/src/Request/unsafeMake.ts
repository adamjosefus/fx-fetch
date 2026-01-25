import { isLeft } from 'effect/Either';
import { inputToRequestIntermediate } from './inputToRequestIntermediate';
import { makeFromRequestIntermediate } from './makeFromRequestIntermediate';
import type { Request } from './Request';

/**
 * Creates a immutable Request object. Throws an error if the input is invalid.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 *
 * //       ┌─── Request.Request
 * //       ▼
 * const request = Request.unsafeMake({
 *   url: 'https://example.com',
 *   method: 'POST'
 * });
 * ```
 *
 * @category Constructors
 * @since 0.1.0
 */
export function unsafeMake(input: Request.Input): Request {
  const intermediate = inputToRequestIntermediate(input);
  if (isLeft(intermediate)) {
    throw intermediate.left;
  }

  return makeFromRequestIntermediate(intermediate.right);
}
