import { pipe } from 'effect';
import type { Input as CoreInput } from '../../../core/Url/SearchParams/index.js';
import { make as coreMake } from '../../../core/Url/SearchParams/make.js';
import type { Input, SearchParams } from './SearchParams.js';

/**
 * @internal Converts a environment-specific Input to a core Input.
 */
export function toCoreInput(input: Input): CoreInput<never> {
  if (input instanceof globalThis.URLSearchParams) {
    return input.entries();
  }

  if (typeof input === 'string') {
    // The core input supports string input,
    // but the manual parsing is heavy and error-prone.
    // We can leverage the native URLSearchParams
    // implementation to parse the string input, instead.
    const jsSearchParams = new globalThis.URLSearchParams(input);
    return jsSearchParams.entries();
  }

  return input;
}

/**
 * @category Constructors
 * @since 2.0.0
 */
export function make(input: Input): SearchParams {
  return pipe(input, toCoreInput, coreMake);
}
