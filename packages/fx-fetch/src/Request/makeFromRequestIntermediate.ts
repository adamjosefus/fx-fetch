import { makeFromUrlIntermediate } from '../Url/makeFromUrlIntermediate';
import { Proto } from './Proto';
import * as Request from './Request';
import { RequestIntermediate } from './RequestIntermediate';

/**
 * @internal Makes a Request.Request from RequestIntermediate.
 */
export function makeFromRequestIntermediate(parts: RequestIntermediate): Request.Request {
  const self = Object.create(Proto);

  const tag: Request.Request['_tag'] = 'Request';
  Object.defineProperty(self, '_tag', {
    value: tag,
    enumerable: true,
    writable: false,
  });

  const cache: Request.Request['cache'] = parts.cache;
  Object.defineProperty(self, 'cache', {
    value: cache,
    enumerable: false,
    writable: false,
  });

  const body: Request.Request['body'] = parts.clonedBody;
  Object.defineProperty(self, 'body', {
    value: body,
    enumerable: false,
    writable: false,
  });

  const headers: Request.Request['headers'] = parts.clonedHeaders;
  Object.defineProperty(self, 'headers', {
    value: headers,
    enumerable: false,
    writable: false,
  });

  const credentials: Request.Request['credentials'] = parts.credentials;
  Object.defineProperty(self, 'credentials', {
    value: credentials,
    enumerable: false,
    writable: false,
  });

  const integrity: Request.Request['integrity'] = parts.integrity;
  Object.defineProperty(self, 'integrity', {
    value: integrity,
    enumerable: false,
    writable: false,
  });

  const keepalive: Request.Request['keepalive'] = parts.keepalive;
  Object.defineProperty(self, 'keepalive', {
    value: keepalive,
    enumerable: false,
    writable: false,
  });

  const method: Request.Request['method'] = parts.method;
  Object.defineProperty(self, 'method', {
    value: method,
    enumerable: false,
    writable: false,
  });

  const mode: Request.Request['mode'] = parts.mode ?? undefined;
  Object.defineProperty(self, 'mode', {
    value: mode,
    enumerable: false,
    writable: false,
  });

  const priority: Request.Request['priority'] = parts.priority ?? undefined;
  Object.defineProperty(self, 'priority', {
    value: priority,
    enumerable: false,
    writable: false,
  });

  const redirect: Request.Request['redirect'] = parts.redirect;
  Object.defineProperty(self, 'redirect', {
    value: redirect,
    enumerable: false,
    writable: false,
  });

  const referrer: Request.Request['referrer'] = parts.referrer;
  Object.defineProperty(self, 'referrer', {
    value: referrer,
    enumerable: false,
    writable: false,
  });

  const referrerPolicy: Request.Request['referrerPolicy'] = parts.referrerPolicy;
  Object.defineProperty(self, 'referrerPolicy', {
    value: referrerPolicy,
    enumerable: false,
    writable: false,
  });

  const signals: Request.Request['signals'] = parts.clonedSignals;
  Object.defineProperty(self, 'signals', {
    value: signals,
    enumerable: false,
    writable: false,
  });

  const url: Request.Request['url'] = makeFromUrlIntermediate(parts.clonedUrl);
  Object.defineProperty(self, 'url', {
    value: url,
    enumerable: false,
    writable: false,
  });

  return self;
}
