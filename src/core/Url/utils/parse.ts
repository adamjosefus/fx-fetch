import type { Url } from '../Url.js';

/** Matches every `+` in a string (global), used to turn `+` back into a space. */
const plusSignPattern = /\+/g;

/**
 * Matches (and captures) the leading `scheme://` of a URL.
 *
 * - `^` — anchored at the start of the string.
 * - `([a-zA-Z][a-zA-Z0-9+.-]*)` — captured scheme name: an ASCII letter followed
 *   by any number of letters, digits, `+`, `.` or `-` (per RFC 3986 §3.1).
 * - `:\/\/` — the literal `://` separator.
 */
const schemePrefixPattern = /^([a-zA-Z][a-zA-Z0-9+.-]*):\/\//;

/**
 * Percent-decodes a component, returning the raw input if it is malformed.
 *
 * `decodeURIComponent` throws a `URIError` on invalid percent-escape sequences
 * — e.g. a lone `%`, `%zz` (non-hex digits), a trailing `100%`, or bytes that
 * form an incomplete surrogate. Such strings appear in real-world URLs whenever
 * a `%` is written literally instead of being encoded as `%25`.
 *
 * The parser is deliberately tolerant: rather than failing the whole `parse`
 * over a single bad character, it degrades gracefully and keeps the component
 * in its raw (undecoded) form. This mirrors how the WHATWG URL parser handles
 * malformed input. The empty `catch {}` swallowing the error is intentional.
 */
function safeDecode(value: string): string {
  try {
    return globalThis.decodeURIComponent(value);
  } catch {
    return value;
  }
}

/**
 * Decodes an `application/x-www-form-urlencoded` component, where `+` denotes a
 * space. This mirrors the encoding used by `SearchParams.format`.
 */
function decodeFormComponent(value: string): string {
  return safeDecode(value.replace(plusSignPattern, ' '));
}

function parseSearch(search: string): readonly (readonly [key: string, value: string])[] {
  if (search === '') {
    return [];
  }

  const pairs: /* mutable */ (readonly [string, string])[] = [];

  for (const part of search.split('&')) {
    if (part === '') {
      continue;
    }

    const separator = part.indexOf('=');
    if (separator === -1) {
      pairs.push([decodeFormComponent(part), '']);
      continue;
    }

    pairs.push([
      decodeFormComponent(part.slice(0, separator)),
      decodeFormComponent(part.slice(separator + 1)),
    ]);
  }

  return pairs;
}

function parseUserinfo(userinfo: string): {
  readonly username: string;
  readonly password: string | undefined;
} {
  const separator = userinfo.indexOf(':');
  if (separator === -1) {
    return { username: safeDecode(userinfo), password: undefined };
  }

  return {
    username: safeDecode(userinfo.slice(0, separator)),
    password: safeDecode(userinfo.slice(separator + 1)),
  };
}

function parseHostPort(hostport: string): { hostname: string; port: string | undefined } {
  // IPv6 hosts are wrapped in brackets (e.g. `[::1]:8080`); the port, if any,
  // follows the closing bracket.
  if (hostport.startsWith('[')) {
    const end = hostport.indexOf(']');
    if (end !== -1) {
      const hostname = hostport.slice(0, end + 1);
      const rest = hostport.slice(end + 1);
      return { hostname, port: rest.startsWith(':') ? rest.slice(1) : undefined };
    }
  }

  const separator = hostport.lastIndexOf(':');
  if (separator === -1) {
    return { hostname: hostport, port: undefined };
  }

  return { hostname: hostport.slice(0, separator), port: hostport.slice(separator + 1) };
}

/**
 * Parses a URL string into its raw parts, following the
 * `scheme://[user[:password]@]host[:port][/path][?query][#fragment]` shape.
 *
 * The returned parts are unnormalized — `partsToIntermediate` applies casing,
 * slash, and credential normalization. Throws when the string lacks a
 * `scheme://` prefix or a hostname.
 *
 * @internal
 */
export function parse(url: string): Url.Parts<never> {
  let rest = url.trim();

  let hash: string | undefined;
  const hashIndex = rest.indexOf('#');
  if (hashIndex !== -1) {
    hash = rest.slice(hashIndex + 1);
    rest = rest.slice(0, hashIndex);
  }

  let search = '';
  const searchIndex = rest.indexOf('?');
  if (searchIndex !== -1) {
    search = rest.slice(searchIndex + 1);
    rest = rest.slice(0, searchIndex);
  }

  const scheme = rest.match(schemePrefixPattern);
  if (scheme === null) {
    throw new Error(`Url cannot be parsed. Expected a "scheme://" prefix. Given: ${url}`);
  }
  const protocol = scheme[1];
  rest = rest.slice(scheme[0].length);

  const pathIndex = rest.indexOf('/');
  const authority = pathIndex === -1 ? rest : rest.slice(0, pathIndex);
  const pathname = pathIndex === -1 ? undefined : rest.slice(pathIndex);

  let username: string | undefined;
  let password: string | undefined;
  let hostport = authority;
  const atIndex = authority.lastIndexOf('@');
  if (atIndex !== -1) {
    ({ username, password } = parseUserinfo(authority.slice(0, atIndex)));
    hostport = authority.slice(atIndex + 1);
  }

  const { hostname, port } = parseHostPort(hostport);
  if (hostname === '') {
    throw new Error(`Url cannot be parsed. Missing hostname. Given: ${url}`);
  }

  return {
    protocol,
    hostname,
    searchParams: parseSearch(search),
    ...(hash !== undefined ? { hash } : {}),
    ...(pathname !== undefined ? { pathname } : {}),
    ...(port !== undefined ? { port } : {}),
    ...(username !== undefined ? { username } : {}),
    ...(password !== undefined ? { password } : {}),
  };
}
