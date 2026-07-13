import type { Option } from 'effect';
import type { Url as CoreUrl } from '../../core/Url/index.js';
import { isUrl } from '../../core/Url/isUrl.js';
import { make as coreMake, unsafeMake as coreUnsafeMake } from '../../core/Url/make.js';
import { toCoreInput as toCoreSearchParams } from './SearchParams/make.js';
import type { Url } from './Url.js';

/**
 * @internal Converts a native `URL` (and nested native `URLSearchParams`) to a
 * core-compatible input; passes every other input through unchanged.
 */
function toCore(input: Url.Input): CoreUrl.Input<never> {
  if (input instanceof globalThis.URL) {
    return input.href;
  }

  if (typeof input === 'string' || isUrl(input)) {
    return input;
  }

  if (input.searchParams !== undefined) {
    return { ...input, searchParams: toCoreSearchParams(input.searchParams) } as CoreUrl.Input<never>;
  }

  return input;
}

/**
 * Creates an immutable Url. Throws if the input is invalid.
 *
 * @category Constructors
 * @since 2.0.0
 */
export function unsafeMake(input: Url.Input): Url {
  return coreUnsafeMake(toCore(input));
}

/**
 * Creates an immutable Url. Returns `Option.none()` if the input is invalid.
 *
 * @category Constructors
 * @since 2.0.0
 */
export function make(input: Url.Input): Option.Option<Url> {
  return coreMake(toCore(input));
}
