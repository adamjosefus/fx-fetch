import { Either, Option } from 'effect';
import { inputToUrlIntermediate } from './inputToUrlIntermediate';
import { makeFromUrlIntermediate } from './makeFromUrlIntermediate';
import * as Url from './Url';

/**
 * Creates an immutable Url object. Throws an error if the input is invalid.
 *
 * @example
 * ```ts
 * import { Url } from 'fx-fetch';
 *
 * const url = Url.unsafeMake('https://api.example.com');
 * ```
 *
 * @category Models
 * @since 0.1.0
 */
export function unsafeMake(input: Url.Url.Input): Url.Url {
  const result = inputToUrlIntermediate(input);
  if (Either.isLeft(result)) {
    throw result.left; // Throw the propagated error
  }

  return makeFromUrlIntermediate(result.right);
}

/**
 * Creates an immutable Url object. Returns `Option.none()` if the input is invalid.
 *
 * @example
 * ```ts
 * import { Url } from 'fx-fetch';
 * import { Option } from 'effect';
 *
 * const urlOption = Url.make('https://api.example.com');
 * if (Option.isSome(urlOption)) {
 *   const url = urlOption.value;
 * }
 * ```
 *
 * @category Models
 * @since 0.1.0
 */
export const make = Option.liftThrowable(unsafeMake);
