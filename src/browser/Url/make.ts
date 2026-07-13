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

function partsToCoreInput(parts: Url.Parts): CoreUrl.Input<never> {
  const coreParts: CoreUrl.Parts<never> = {
    hash: parts.hash,
    hostname: parts.hostname,
    password: parts.password,
    pathname: parts.pathname,
    port: parts.port === '' ? undefined : parts.port,
    protocol: parts.protocol,
    searchParams:
      parts.searchParams !== undefined ? toCoreSearchParams(parts.searchParams) : undefined,
    username: parts.username,
  };

  return coreParts;
}

function optionsToCoreInput(options: Url.Options): CoreUrl.Input<never> {
  // TODO: globalThis.URL can throw a TypeError if the URL is invalid. We should handle that case
  const jsUrl = new globalThis.URL(options.url);
  const coreParts: CoreUrl.Parts<never> = {
    hash: jsUrl.hash,
    hostname: jsUrl.hostname,
    password: jsUrl.password,
    pathname: jsUrl.pathname,
    port: jsUrl.port === '' ? undefined : jsUrl.port,
    protocol: jsUrl.protocol,
    searchParams:
      options.searchParams !== undefined
        ? toCoreSearchParams(options.searchParams)
        : toCoreSearchParams(jsUrl.searchParams),
    username: jsUrl.username,
  };

  return coreParts;
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
    return partsToCoreInput(input);
  }

  if (isOptions(input)) {
    return optionsToCoreInput(input);
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
