import { Option, pipe, Result } from 'effect';
import { inputToIntermediate } from './intermediate/inputToIntermediate.js';
import { urlFromIntermediate } from './intermediate/urlFromIntermediate.js';
import { validateIntermediate } from './intermediate/validateIntermediate.js';
import type { Url } from './Url.js';

/**
 * Creates an immutable Url. Throws if the input is invalid.
 *
 * @category Constructors
 * @since 2.0.0
 */
export function unsafeMake(input: Url.Input): Url {
  const result = pipe(input, inputToIntermediate, validateIntermediate);
  if (Result.isFailure(result)) {
    throw result.failure;
  }

  return urlFromIntermediate(result.success);
}

/**
 * Creates an immutable Url. Returns `Option.none()` if the input is invalid.
 *
 * @category Constructors
 * @since 2.0.0
 */
export const make = Option.liftThrowable(unsafeMake);
