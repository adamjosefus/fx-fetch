import { Proto } from '../Proto.js';
import { searchParamsFromIntermediate } from '../SearchParams/intermediate/searchParamsFromIntermediate.js';
import type { Url } from '../Url.js';
import type { $Url } from './$Url.js';

/**
 * @internal Makes an immutable Url from an intermediate Url.
 */
export function urlFromIntermediate(intermediate: $Url): Url {
  const self = Object.create(Proto);

  const tag: Url['_tag'] = 'Url';
  Object.defineProperty(self, '_tag', { value: tag, enumerable: false, writable: false });
  Object.defineProperty(self, 'hash', {
    value: intermediate.hash,
    enumerable: false,
    writable: false,
  });
  Object.defineProperty(self, 'hostname', {
    value: intermediate.hostname,
    enumerable: false,
    writable: false,
  });
  Object.defineProperty(self, 'password', {
    value: intermediate.password,
    enumerable: false,
    writable: false,
  });
  Object.defineProperty(self, 'pathname', {
    value: intermediate.pathname,
    enumerable: false,
    writable: false,
  });
  Object.defineProperty(self, 'port', {
    value: intermediate.port,
    enumerable: false,
    writable: false,
  });
  Object.defineProperty(self, 'protocol', {
    value: intermediate.protocol,
    enumerable: false,
    writable: false,
  });
  Object.defineProperty(self, 'searchParams', {
    value: searchParamsFromIntermediate(intermediate.searchParams),
    enumerable: false,
    writable: false,
  });
  Object.defineProperty(self, 'username', {
    value: intermediate.username,
    enumerable: false,
    writable: false,
  });

  return self;
}
