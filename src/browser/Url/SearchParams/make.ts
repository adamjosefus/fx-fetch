import type { Input as CoreInput } from '../../../core/Url/SearchParams/index.js';
import { make as coreMake } from '../../../core/Url/SearchParams/make.js';
import type { Input, SearchParams } from './SearchParams.js';

/**
 * @internal Converts a native `URLSearchParams` or a query string to a
 * core-compatible input; passes every other input through unchanged.
 */
export function toCoreInput(input: Input): CoreInput<never> {
  if (typeof input === 'string') {
    return [...new globalThis.URLSearchParams(input)];
  }

  return input instanceof globalThis.URLSearchParams ? [...input] : input;
}

/**
 * @category Constructors
 * @since 2.0.0
 */
export function make(input: Input): SearchParams {
  return coreMake(toCoreInput(input));
}
