import { Proto } from './Proto';
import * as Url from './Url';
import { UrlIntermediate } from './UrlIntermediate';

/**
 * @internal Makes a Url.Url from UrlIntermediate.
 */
export function makeFromUrlIntermediate(parts: UrlIntermediate): Url.Url {
  const self = Object.create(Proto);

  const tag: Url.Url['_tag'] = 'Url';
  Object.defineProperty(self, '_tag', {
    value: tag,
    enumerable: true,
    writable: false,
  });

  const hash: Url.Url['hash'] = parts.hash;
  Object.defineProperty(self, 'hash', {
    value: hash,
    enumerable: true,
    writable: false,
  });

  const hostname: Url.Url['hostname'] = parts.hostname;
  Object.defineProperty(self, 'hostname', {
    value: hostname,
    enumerable: true,
    writable: false,
  });

  const password: Url.Url['password'] = parts.password;
  Object.defineProperty(self, 'password', {
    value: password,
    enumerable: true,
    writable: false,
  });

  const pathname: Url.Url['pathname'] = parts.pathname;
  Object.defineProperty(self, 'pathname', {
    value: pathname,
    enumerable: true,
    writable: false,
  });

  const port: Url.Url['port'] = parts.port;
  Object.defineProperty(self, 'port', {
    value: port,
    enumerable: true,
    writable: false,
  });

  const protocol: Url.Url['protocol'] = parts.protocol;
  Object.defineProperty(self, 'protocol', {
    value: protocol,
    enumerable: true,
    writable: false,
  });

  const searchParams: Url.Url['searchParams'] = parts.clonedSearchParams;
  Object.defineProperty(self, 'searchParams', {
    value: searchParams,
    enumerable: true,
    writable: false,
  });

  const username: Url.Url['username'] = parts.username;
  Object.defineProperty(self, 'username', {
    value: username,
    enumerable: true,
    writable: false,
  });

  return self;
}
