import { IllegalArgumentException } from 'effect/Cause';
import { type Either, map as eitherMap, isLeft, left, right } from 'effect/Either';
import { pipe } from 'effect/Function';
import { isJsUrl } from '../utils/isJsUrl';
import type * as localThis from '../utils/localThis';
import { toLowercase } from '../utils/toLowercase';
import { formatUrlUntrusted } from './formatUrlUntrusted';
import { isUrl } from './isUrl';
import { inputToSearchParamsIntermediate } from './SearchParamsIntermediate';
import type { Url } from './Url';
import type { UrlIntermediate } from './UrlIntermediate';

function isUrlOptions(value: unknown): value is Url.Options {
  const isObject = typeof value === 'object' && value !== null;
  if (!isObject) {
    return false;
  }

  const hasUrl = 'url' in value;
  const isUrlString = hasUrl && typeof value.url === 'string';
  const isUrlInstance = hasUrl && value.url instanceof globalThis.URL;

  return isUrlInstance || isUrlString;
}

function stripFirstSlash(s: string) {
  return s.startsWith('/') ? s.slice(1) : s;
}

function stripLastSlash(s: string) {
  return s.endsWith('/') ? s.slice(0, -1) : s;
}

function normalizeHash(hash: string | undefined): string | undefined {
  if (hash === undefined) {
    return undefined;
  }

  if (hash === '') {
    // globalThis.URL creates empty hash as blank string.
    return undefined;
  }

  return pipe(
    hash,
    (s) => (!s.startsWith('#') ? s : s.slice(1)) // Remove leading `#` hash
  );
}

function normalizeHostname(hostname: string): string {
  return pipe(hostname, toLowercase, stripLastSlash);
}

function normalizePathname(pathname: string | undefined): string | undefined {
  if (pathname === undefined) {
    return undefined;
  }

  if (pathname === '/') {
    // globalThis.URL creates empty pathname as single slash.
    return undefined;
  }

  if (pathname === '') {
    return undefined;
  }

  return pipe(pathname, stripFirstSlash, stripLastSlash);
}

function normalizePort(port: string | number | undefined): number | undefined {
  if (port === undefined) {
    return undefined;
  }

  if (typeof port === 'number') {
    return port;
  }

  if (port === '') {
    // globalThis.URL creates empty port as blank string.
    return undefined;
  }

  return Number.parseInt(port, 10);
}

function normalizeProtocol(protocol: string): string {
  return pipe(
    protocol,
    toLowercase,
    (s) => (!s.endsWith('//') ? s : s.slice(0, -2)), // Ensure protocol does not end with double slash
    (s) => (s.endsWith(':') ? s : `${s}:`) // Ensure protocol ends with colon
  );
}

function normalizeUsername(username: string | undefined): string | undefined {
  if (username === undefined) {
    return undefined;
  }

  if (username === '') {
    // globalThis.URL creates empty username as blank string.
    return undefined;
  }

  return username;
}

function normalizePassword(password: string | undefined): string | undefined {
  if (password === undefined) {
    return undefined;
  }

  if (password === '') {
    // globalThis.URL creates empty password as blank string.
    return undefined;
  }

  return password;
}

function isPortValid(value: number | undefined): boolean {
  if (value === undefined) {
    return true;
  }

  return Number.isSafeInteger(value) && value >= 0 && value <= 65535;
}

function isUrlConstructable(url: UrlIntermediate): boolean {
  try {
    // Validate by attempting to create a URL string and passing it to the URL constructor
    const urlString = formatUrlUntrusted(url);
    const _url = new globalThis.URL(urlString); // Throws if invalid

    return true;
  } catch (_error) {
    return false;
  }
}

function areCredentialsValid(url: UrlIntermediate): boolean {
  const hasUsername = url.username !== undefined;
  const hasPassword = url.password !== undefined;

  if (hasUsername && hasPassword) {
    return true; // Both username and password are valid
  }

  if (hasUsername && !hasPassword) {
    return true; // Username without password is valid
  }

  if (!hasUsername && hasPassword) {
    return false; // Password without username is invalid
  }

  return true; // No username and no password is valid
}

function validateUrlIntermediate(
  url: UrlIntermediate
): Either<UrlIntermediate, IllegalArgumentException> {
  if (!isPortValid(url.port)) {
    return left(
      new IllegalArgumentException(
        `Url cannot be created. Port must be an integer between 0 and 65535. Given: ${url.port}`
      )
    );
  }

  if (!areCredentialsValid(url)) {
    return left(new IllegalArgumentException('Url cannot be created. Password without username.'));
  }

  if (!isUrlConstructable(url)) {
    return left(new IllegalArgumentException('Url cannot be created. Invalid URL input.'));
  }

  return right(url);
}

/**
 * @internal Converts a Url.Url.Parts string to mutable UrlIntermediate
 * without keeping references to the input object.
 */
function partsToUrlIntermediate(
  parts: Url.Parts
): Either<UrlIntermediate, IllegalArgumentException> {
  const intermediate: UrlIntermediate = {
    clonedSearchParams: inputToSearchParamsIntermediate(parts.searchParams),
    hash: normalizeHash(parts.hash),
    hostname: normalizeHostname(parts.hostname),
    password: normalizePassword(parts.password),
    pathname: normalizePathname(parts.pathname),
    port: normalizePort(parts.port),
    protocol: normalizeProtocol(parts.protocol),
    username: normalizeUsername(parts.username),
  };

  return validateUrlIntermediate(intermediate);
}

/**
 * @internal Converts a globalThis.URL to mutable UrlIntermediate
 * without keeping references to the input object.
 */
function jsUrlToUrlIntermediate(jsUrl: localThis.URL): UrlIntermediate {
  // Construct from globalThis.URL cannot fail, so we always return a Right
  return {
    clonedSearchParams: inputToSearchParamsIntermediate(jsUrl.searchParams),
    hash: normalizeHash(jsUrl.hash),
    hostname: normalizeHostname(jsUrl.hostname),
    password: normalizePassword(jsUrl.password),
    pathname: normalizePathname(jsUrl.pathname),
    port: normalizePort(jsUrl.port),
    protocol: normalizeProtocol(jsUrl.protocol),
    username: normalizeUsername(jsUrl.username),
  };
}

/**
 * @internal Converts a Url.Url string to mutable UrlIntermediate
 * without keeping references to the input object.
 */
export function urlToUrlIntermediate(url: Url): UrlIntermediate {
  // Construct from Url.Url cannot fail, so we always return a Right
  return {
    clonedSearchParams: inputToSearchParamsIntermediate(url.searchParams), // Already normalized
    hash: url.hash, // Already normalized
    hostname: url.hostname, // Already normalized
    password: url.password, // Already normalized
    pathname: url.pathname, // Already normalized
    port: url.port, // Already normalized
    protocol: url.protocol, // Already normalized
    username: url.username, // Already normalized
  };
}

/**
 * @internal Converts a Url.Url.Options string to mutable UrlIntermediate
 * without keeping references to the input object.
 */
function optionsToUrlIntermediate(
  options: Url.Options
): Either<UrlIntermediate, IllegalArgumentException> {
  const url: Either<UrlIntermediate, IllegalArgumentException> = isJsUrl(options.url)
    ? right(jsUrlToUrlIntermediate(options.url))
    : stringToUrlIntermediate(options.url);

  if (isLeft(url)) {
    // Propagate error
    return url;
  }

  if (options.searchParams === undefined) {
    // No additional search params to merge, just return the URL intermediate
    return url;
  }

  // Merge additional search params
  return url.pipe(
    eitherMap((url) => {
      const searchParams = inputToSearchParamsIntermediate(options.searchParams);

      for (const [key, values] of searchParams) {
        const list = url.clonedSearchParams.get(key) ?? [];
        list.push(...values);

        url.clonedSearchParams.set(key, list);
      }

      return url;
    })
  );
}

/**
 * @internal Converts a URL string to mutable UrlIntermediate
 * without keeping references to the input object.
 */
function stringToUrlIntermediate(
  urlString: string
): Either<UrlIntermediate, IllegalArgumentException> {
  try {
    const jsUrl = new globalThis.URL(urlString); // Throws if the URL is invalid
    return right(jsUrlToUrlIntermediate(jsUrl));
  } catch (_cause) {
    const error = new IllegalArgumentException('Url cannot be created. Invalid URL input.');
    return left(error);
  }
}

/**
 * @internal Converts a Url.Url.Input to mutable UrlIntermediate
 * without keeping references to the input object.
 */
export function inputToUrlIntermediate(
  input: Url.Input
): Either<UrlIntermediate, IllegalArgumentException> {
  // Url.Url
  if (isUrl(input)) {
    return right(urlToUrlIntermediate(input));
  }

  // globalThis.URL
  if (isJsUrl(input)) {
    return right(jsUrlToUrlIntermediate(input));
  }

  // Url.Url.Options
  if (isUrlOptions(input)) {
    return optionsToUrlIntermediate(input);
  }

  // URL string
  if (typeof input === 'string') {
    return stringToUrlIntermediate(input);
  }

  // Url.Url.Parts
  return partsToUrlIntermediate(input);
}
