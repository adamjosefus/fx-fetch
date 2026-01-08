import { makeFromUrlIntermediate } from '../Url/makeFromUrlIntermediate';
import { Proto } from './Proto';
import type { Request } from './Request';
import { RequestIntermediate } from './RequestIntermediate';

/**
 * @internal Makes a Request.Request from RequestIntermediate.
 */
export function makeFromRequestIntermediate(parts: RequestIntermediate): Request {
  const self = Object.create(Proto);

  const tag: Request['_tag'] = 'Request';
  Object.defineProperty(self, '_tag', {
    value: tag,
    enumerable: true,
    writable: false,
  });

  const cache: Request['cache'] = parts.cache;
  Object.defineProperty(self, 'cache', {
    value: cache,
    enumerable: false,
    writable: false,
  });

  const body: Request['body'] = parts.clonedBody;
  Object.defineProperty(self, 'body', {
    value: body,
    enumerable: false,
    writable: false,
  });

  const headers: Request['headers'] = parts.clonedHeaders;
  Object.defineProperty(self, 'headers', {
    value: headers,
    enumerable: false,
    writable: false,
  });

  const credentials: Request['credentials'] = parts.credentials;
  Object.defineProperty(self, 'credentials', {
    value: credentials,
    enumerable: false,
    writable: false,
  });

  const integrity: Request['integrity'] = parts.integrity;
  Object.defineProperty(self, 'integrity', {
    value: integrity,
    enumerable: false,
    writable: false,
  });

  const keepalive: Request['keepalive'] = parts.keepalive;
  Object.defineProperty(self, 'keepalive', {
    value: keepalive,
    enumerable: false,
    writable: false,
  });

  const method: Request['method'] = parts.method;
  Object.defineProperty(self, 'method', {
    value: method,
    enumerable: false,
    writable: false,
  });

  const mode: Request['mode'] = parts.mode ?? undefined;
  Object.defineProperty(self, 'mode', {
    value: mode,
    enumerable: false,
    writable: false,
  });

  const priority: Request['priority'] = parts.priority ?? undefined;
  Object.defineProperty(self, 'priority', {
    value: priority,
    enumerable: false,
    writable: false,
  });

  const redirect: Request['redirect'] = parts.redirect;
  Object.defineProperty(self, 'redirect', {
    value: redirect,
    enumerable: false,
    writable: false,
  });

  const referrer: Request['referrer'] = parts.referrer;
  Object.defineProperty(self, 'referrer', {
    value: referrer,
    enumerable: false,
    writable: false,
  });

  const referrerPolicy: Request['referrerPolicy'] = parts.referrerPolicy;
  Object.defineProperty(self, 'referrerPolicy', {
    value: referrerPolicy,
    enumerable: false,
    writable: false,
  });

  const signals: Request['signals'] = parts.clonedSignals;
  Object.defineProperty(self, 'signals', {
    value: signals,
    enumerable: false,
    writable: false,
  });

  const url: Request['url'] = makeFromUrlIntermediate(parts.clonedUrl);
  Object.defineProperty(self, 'url', {
    value: url,
    enumerable: false,
    writable: false,
  });

  return self;
}
