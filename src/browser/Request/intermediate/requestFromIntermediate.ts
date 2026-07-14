import { urlFromIntermediate } from '../../Url/intermediate/urlFromIntermediate.js';
import { headersFromIntermediate } from '../Headers/intermediate/headersFromIntermediate.js';
import { Proto } from '../Proto.js';
import type { Request } from '../Request.js';
import type { $Request } from './$Request.js';

/**
 * @internal Makes an immutable Request from an intermediate Request.
 */
export function requestFromIntermediate(intermediate: $Request): Request {
  const self = Object.create(Proto);

  const tag: Request['_tag'] = 'Request';
  Object.defineProperty(self, '_tag', { value: tag, enumerable: false, writable: false });
  Object.defineProperty(self, 'cache', {
    value: intermediate.cache,
    enumerable: false,
    writable: false,
  });
  Object.defineProperty(self, 'credentials', {
    value: intermediate.credentials,
    enumerable: false,
    writable: false,
  });
  Object.defineProperty(self, 'headers', {
    value: headersFromIntermediate(intermediate.headers),
    enumerable: false,
    writable: false,
  });
  Object.defineProperty(self, 'integrity', {
    value: intermediate.integrity,
    enumerable: false,
    writable: false,
  });
  Object.defineProperty(self, 'keepalive', {
    value: intermediate.keepalive,
    enumerable: false,
    writable: false,
  });
  Object.defineProperty(self, 'method', {
    value: intermediate.method,
    enumerable: false,
    writable: false,
  });
  Object.defineProperty(self, 'mode', {
    value: intermediate.mode,
    enumerable: false,
    writable: false,
  });
  Object.defineProperty(self, 'priority', {
    value: intermediate.priority,
    enumerable: false,
    writable: false,
  });
  Object.defineProperty(self, 'redirect', {
    value: intermediate.redirect,
    enumerable: false,
    writable: false,
  });
  Object.defineProperty(self, 'referrer', {
    value: intermediate.referrer,
    enumerable: false,
    writable: false,
  });
  Object.defineProperty(self, 'referrerPolicy', {
    value: intermediate.referrerPolicy,
    enumerable: false,
    writable: false,
  });
  Object.defineProperty(self, 'url', {
    value: urlFromIntermediate(intermediate.url),
    enumerable: false,
    writable: false,
  });

  return self;
}
