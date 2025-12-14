import { Either } from 'effect';
import { inputToRequestIntermediate } from './inputToRequestIntermediate';
import { makeFromRequestIntermediate } from './makeFromRequestIntermediate';
import * as Request from './Request';

// TODO: Add tests for dual APIs

/**
 * Creates a immutable Request object. Throws an error if the input is invalid.
 *
 * @example
 * ```ts
 * import { Request } from 'fx-fetch';
 *
 * const request = Request.unsafeMake({ url: 'https://api.example.com' });
 * ```
 *
 * @category Constructors
 * @since 0.1.0
 */
export function unsafeMake(input: Request.Request.Input): Request.Request {
  const intermediate = inputToRequestIntermediate(input);
  if (Either.isLeft(intermediate)) {
    throw intermediate.left;
  }

  return makeFromRequestIntermediate(intermediate.right);
}
