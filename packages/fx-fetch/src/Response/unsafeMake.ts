import { isLeft } from 'effect/Either';
import { inputToResponseIntermediate } from './inputToResponseIntermediate';
import { makeFromResponseIntermediate } from './makeFromResponseIntermediate';
import type { Response } from './Response';

// TODO: Add tests for dual APIs
// TODO: Add examples
// TODO: Add annotations

/**
 * Creates a immutable Response object.
 *
 * @category Models
 * @since 0.1.0
 */
export function unsafeMake(input: Response.Input): Response {
  const intermediate = inputToResponseIntermediate(input);

  if (isLeft(intermediate)) {
    throw intermediate.left;
  }

  return makeFromResponseIntermediate(intermediate.right);
}
