import { Option } from 'effect';
import type { Url as CoreUrl } from '../../core/Url/index.js';
import { unsafeMake as coreUnsafeMake } from '../../core/Url/make.js';
import { isOptions } from '../../core/Url/utils/isOptions.js';
import { isParts } from '../../core/Url/utils/isParts.js';
import { toCoreInput as toCoreSearchParams } from './SearchParams/make.js';
import type { Url } from './Url.js';

function jsUrlToCoreInput(jsUrl: globalThis.URL): CoreUrl.Input<never> {
  const parts: CoreUrl.Parts<never> = {
    hash: jsUrl.hash,
    hostname: jsUrl.hostname,
    password: jsUrl.password,
    pathname: jsUrl.pathname,
    port: jsUrl.port === '' ? undefined : jsUrl.port,
    protocol: jsUrl.protocol,
    searchParams: toCoreSearchParams(jsUrl.searchParams),
    username: jsUrl.username,
  };

  return parts;
}

/**
 * @internal Converts a native `URL` (and nested native `URLSearchParams`) to a
 * core-compatible input; passes every other input through unchanged.
 */
function toCoreInput(input: Url.Input): CoreUrl.Input<never> {
  if (input instanceof globalThis.URL) {
    return jsUrlToCoreInput(input);
  }

  if (typeof input === 'string') {
    const jsUrl = new globalThis.URL(input);
    return jsUrlToCoreInput(jsUrl);
  }

  if (isParts(input)) {
    const parts: CoreUrl.Parts<never> = {
      hash: input.hash,
      hostname: input.hostname,
      password: input.password,
      pathname: input.pathname,
      port: input.port === '' ? undefined : input.port,
      protocol: input.protocol,
      searchParams:
        input.searchParams !== undefined ? toCoreSearchParams(input.searchParams) : undefined,
      username: input.username,
    };

    return parts;
  }

  if (isOptions(input)) {
    const jsUrl = new globalThis.URL(input.url);
    const parts: CoreUrl.Parts<never> = {
      hash: jsUrl.hash,
      hostname: jsUrl.hostname,
      password: jsUrl.password,
      pathname: jsUrl.pathname,
      port: jsUrl.port === '' ? undefined : jsUrl.port,
      protocol: jsUrl.protocol,
      searchParams:
        input.searchParams !== undefined
          ? toCoreSearchParams(input.searchParams)
          : toCoreSearchParams(jsUrl.searchParams),
      username: jsUrl.username,
    };

    return parts;
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
  return coreUnsafeMake(toCoreInput(input));
}

/**
 * Creates an immutable Url. Returns `Option.none()` if the input is invalid.
 *
 * @category Constructors
 * @since 2.0.0
 */
export const make = Option.liftThrowable(unsafeMake);
