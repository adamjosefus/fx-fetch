import { isUrl } from '../isUrl.js';
import { parse } from '../parse.js';
import { inputToIntermediate as searchParamsInputToIntermediate } from '../SearchParams/intermediate/inputToIntermediate.js';
import { searchParamsToIntermediate } from '../SearchParams/intermediate/searchParamsToIntermediate.js';
import type { Url } from '../Url.js';
import type { $Url } from './$Url.js';

// TODO: Ensure that the normalization functions are correct. The solution should work same as the globalThis.URL constructor, but without using it.

function stripFirstSlash(value: string): string {
  return value.startsWith('/') ? value.slice(1) : value;
}

function stripLastSlash(value: string): string {
  return value.endsWith('/') ? value.slice(0, -1) : value;
}

function normalizeHash(hash: string | undefined): string | undefined {
  if (hash === undefined || hash === '') {
    return undefined;
  }

  return hash.startsWith('#') ? hash.slice(1) : hash;
}

function normalizeHostname(hostname: string): string {
  return stripLastSlash(hostname.toLowerCase());
}

function normalizePathname(pathname: string | undefined): string | undefined {
  if (pathname === undefined || pathname === '' || pathname === '/') {
    return undefined;
  }

  return stripLastSlash(stripFirstSlash(pathname));
}

function normalizePort(port: string | number | undefined): number | undefined {
  if (port === undefined || port === '') {
    return undefined;
  }

  if (typeof port === 'number') {
    return port;
  }

  return Number.parseInt(port, 10);
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
  return {
    hash: normalizeHash(parts.hash),
    hostname: normalizeHostname(parts.hostname),
    password: normalizeCredential(parts.password),
    pathname: normalizePathname(parts.pathname),
    port: normalizePort(parts.port),
    protocol: normalizeProtocol(parts.protocol),
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
