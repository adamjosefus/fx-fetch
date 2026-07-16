import { Option, pipe, Result } from 'effect';
import { inputToIntermediate } from './intermediate/inputToIntermediate.js';
import { requestFromIntermediate } from './intermediate/requestFromIntermediate.js';
import { validateIntermediate } from './intermediate/validateIntermediate.js';
import type { Request } from './Request.js';

/**
 * Creates an immutable Request. Throws if the input is invalid.
 *
 * @category Constructors
 * @since 0.1.0
 */
export function unsafeMake(input: Request.Input): Request {
  const result = pipe(input, inputToIntermediate, validateIntermediate);
  if (Result.isFailure(result)) {
    throw result.failure;
  }

  return requestFromIntermediate(result.success);
}

/**
 * Creates an immutable Request. Returns `Option.none()` if the input is invalid.
 *
 * @category Constructors
 * @since 0.1.0
 */
export const make = Option.liftThrowable(unsafeMake);
