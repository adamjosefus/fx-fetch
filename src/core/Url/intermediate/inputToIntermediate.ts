import { isUrl } from '../isUrl.js';
import { parse } from '../parse.js';
import { inputToIntermediate as searchParamsInputToIntermediate } from '../SearchParams/intermediate/inputToIntermediate.js';
import { searchParamsToIntermediate } from '../SearchParams/intermediate/searchParamsToIntermediate.js';
import type { Url } from '../Url.js';
import type { $Url } from './$Url.js';

// Normalization mirrors the `globalThis.URL` constructor for special schemes,
// without using `URL` itself. The internal representation stores the pathname
// without its leading slash (a trailing slash is kept); `format` re-adds the
// leading slash so its output matches `new URL(...).href`. Known divergences (out
// of scope): IDNA/punycode of unicode hostnames, and raw-query preservation of
// bare keys. See format.test.ts.

/**
 * Default ports per special scheme. A port equal to its scheme's default is
 * dropped, matching `new URL(...).port === ''`.
 */
const defaultPorts: Readonly<Record<string, number>> = {
  'ftp:': 21,
  'http:': 80,
  'https:': 443,
  'ws:': 80,
  'wss:': 443,
};

function normalizeHash(hash: string | undefined): string | undefined {
  if (hash === undefined || hash === '') {
    return undefined;
  }

  return hash.startsWith('#') ? hash.slice(1) : hash;
}

function normalizeHostname(hostname: string): string {
  return hostname.toLowerCase();
}

/**
 * Percent-encodes a path segment using the WHATWG "path percent-encode set":
 * C0 controls, code points above U+007E, and the ASCII characters
 * ``space " # < > ? ` { }``. Existing `%`-escapes are left intact.
 */
function encodePathSegment(segment: string): string {
  let encoded = '';

  for (const char of segment) {
    const codePoint = char.codePointAt(0) ?? 0;
    const shouldEncode = codePoint <= 0x1f || codePoint > 0x7e || ' "#<>?`{}'.includes(char);

    encoded += shouldEncode ? globalThis.encodeURIComponent(char) : char;
  }

  return encoded;
}

/**
 * Resolves `.` and `..` dot-segments following RFC 3986 §5.2.4. The input must
 * start with `/`.
 */
function removeDotSegments(path: string): string {
  let input = path;
  let output = '';

  while (input.length > 0) {
    if (input.startsWith('../')) {
      input = input.slice(3);
      continue;
    }

    if (input.startsWith('./')) {
      input = input.slice(2);
      continue;
    }

    if (input.startsWith('/./')) {
      input = `/${input.slice(3)}`;
      continue;
    }

    if (input === '/.') {
      input = '/';
      continue;
    }

    if (input.startsWith('/../')) {
      input = `/${input.slice(4)}`;
      output = output.slice(0, Math.max(0, output.lastIndexOf('/')));
      continue;
    }

    if (input === '/..') {
      input = '/';
      output = output.slice(0, Math.max(0, output.lastIndexOf('/')));
      continue;
    }

    if (input === '.' || input === '..') {
      input = '';
      continue;
    }

    const nextSlash = input.indexOf('/', 1);
    if (nextSlash === -1) {
      output += input;
      input = '';
      continue;
    }

    output += input.slice(0, nextSlash);
    input = input.slice(nextSlash);
  }

  return output;
}

/**
 * Normalizes a pathname for the internal representation: dot-segments are
 * resolved and segments percent-encoded (matching `new URL(...)`), and the
 * leading slash is stripped for a clean stored form. A trailing slash is kept
 * (`a/b/` → `a/b/`); a root or empty path becomes `undefined`. `format` re-adds
 * the leading slash so its output matches `new URL(...).href`.
 */
function normalizePathname(pathname: string | undefined): string | undefined {
  if (pathname === undefined || pathname === '') {
    return undefined;
  }

  const withLeadingSlash = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const resolved = removeDotSegments(withLeadingSlash);
  const encoded = resolved.split('/').map(encodePathSegment).join('/');
  const withoutLeadingSlash = encoded.startsWith('/') ? encoded.slice(1) : encoded;

  return withoutLeadingSlash === '' ? undefined : withoutLeadingSlash;
}

function normalizePort(port: string | number | undefined): number | undefined {
  if (port === undefined || port === '') {
    return undefined;
  }

  if (typeof port === 'number') {
    return port;
  }

  // A non-numeric port is invalid; the resulting NaN is rejected by
  // validateIntermediate, matching `new URL(...)` throwing on such input.
  return /^\d+$/.test(port) ? Number.parseInt(port, 10) : Number.NaN;
}

function normalizeProtocol(protocol: string): string {
  const lowercased = protocol.toLowerCase();
  const withoutSlashes = lowercased.endsWith('//') ? lowercased.slice(0, -2) : lowercased;

  return withoutSlashes.endsWith(':') ? withoutSlashes : `${withoutSlashes}:`;
}

function normalizeCredential(credential: string | undefined): string | undefined {
  if (credential === undefined || credential === '') {
    return undefined;
  }

  return credential;
}

function partsToIntermediate(parts: Url.Parts<never>): $Url {
  const protocol = normalizeProtocol(parts.protocol);
  const port = normalizePort(parts.port);

  return {
    hash: normalizeHash(parts.hash),
    hostname: normalizeHostname(parts.hostname),
    password: normalizeCredential(parts.password),
    pathname: normalizePathname(parts.pathname),
    port: port !== undefined && defaultPorts[protocol] === port ? undefined : port,
    protocol,
    searchParams: searchParamsInputToIntermediate(parts.searchParams ?? []),
    username: normalizeCredential(parts.username),
  };
}

function urlToIntermediate(url: Url): $Url {
  return {
    hash: url.hash,
    hostname: url.hostname,
    password: url.password,
    pathname: url.pathname,
    port: url.port,
    protocol: url.protocol,
    searchParams: searchParamsToIntermediate(url.searchParams),
    username: url.username,
  };
}

function optionsToIntermediate(options: Url.Options<never>): $Url {
  const intermediate = partsToIntermediate(parse(options.url));

  if (options.searchParams !== undefined) {
    for (const [key, values] of searchParamsInputToIntermediate(options.searchParams)) {
      const list = intermediate.searchParams.get(key) ?? [];
      list.push(...values);
      intermediate.searchParams.set(key, list);
    }
  }

  return intermediate;
}

function isOptions(input: Url.Parts<never> | Url.Options<never>): input is Url.Options<never> {
  return 'url' in input;
}

export function inputToIntermediate(input: Url.Input<never>): $Url {
  if (isUrl(input)) {
    return urlToIntermediate(input);
  }

  if (typeof input === 'string') {
    return partsToIntermediate(parse(input));
  }

  if (isOptions(input)) {
    return optionsToIntermediate(input);
  }

  return partsToIntermediate(input);
}
