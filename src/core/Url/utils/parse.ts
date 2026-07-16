import { safeDecodeUriComponent } from '../SearchParams/utils/safeDecodeUriComponent.js';
import type { Url } from '../Url.js';

/**
 * Matches (and captures) the leading `scheme://` of a URL.
 *
 * - `^` — anchored at the start of the string.
 * - `([a-zA-Z][a-zA-Z0-9+.-]*)` — captured scheme name: an ASCII letter followed
 *   by any number of letters, digits, `+`, `.` or `-` (per RFC 3986 §3.1).
 * - `:\/\/` — the literal `://` separator.
 */
const schemePrefixPattern = /^([a-zA-Z][a-zA-Z0-9+.-]*):\/\//;

function parseUserinfo(userinfo: string): {
  readonly username: string;
  readonly password: string | undefined;
} {
  const separator = userinfo.indexOf(':');
  if (separator === -1) {
    return { username: safeDecodeUriComponent(userinfo), password: undefined };
  }

  return {
    username: safeDecodeUriComponent(userinfo.slice(0, separator)),
    password: safeDecodeUriComponent(userinfo.slice(separator + 1)),
  };
}

function parseHostPort(hostport: string): {
  readonly hostname: string;
  readonly port: string | undefined;
} {
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
 * slash, and credential normalization. The query string is returned raw (as
 * `searchParams`); the `SearchParams` module owns its parsing and decoding.
 * Throws when the string lacks a `scheme://` prefix or a hostname.
 *
 * @internal
 */
export function parse(url: string) {
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

  const protocol = scheme[1] ?? '';
  if (protocol === '') {
    throw new Error(`Url cannot be parsed. Expected a "scheme://" prefix. Given: ${url}`);
  }

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
    searchParams: search !== '' ? search : undefined,
    ...(hash !== undefined ? { hash } : {}),
    ...(pathname !== undefined ? { pathname } : {}),
    ...(port !== undefined ? { port } : {}),
    ...(username !== undefined ? { username } : {}),
    ...(password !== undefined ? { password } : {}),
  } as const satisfies Url.Parts<never>;
}
