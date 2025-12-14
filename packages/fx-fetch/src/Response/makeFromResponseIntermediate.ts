import * as Url from '../Url';
import { Proto } from './Proto';
import * as Response from './Response';
import { ResponseIntermediate } from './ResponseIntermediate';

/**
 * @internal
 */
export function makeFromResponseIntermediate(parts: ResponseIntermediate): Response.Response {
  const self = Object.create(Proto);

  const tag: Response.Response['_tag'] = 'Response';
  Object.defineProperty(self, '_tag', {
    value: tag,
    enumerable: true,
    writable: false,
  });

  const headers: Response.Response['headers'] = parts.clonedHeaders ?? new Map<never, never>();
  Object.defineProperty(self, 'headers', {
    value: headers,
    enumerable: true,
    writable: false,
  });

  const status: Response.Response['status'] = parts.status;
  Object.defineProperty(self, 'status', {
    value: status,
    enumerable: true,
    writable: false,
  });

  const statusText: Response.Response['statusText'] = parts.statusText;
  Object.defineProperty(self, 'statusText', {
    value: statusText,
    enumerable: true,
    writable: false,
  });

  const type: Response.Response['type'] = parts.type;
  Object.defineProperty(self, 'type', {
    value: type,
    enumerable: true,
    writable: false,
  });

  const url: Response.Response['url'] =
    parts.clonedUrl !== undefined
      ? Url.unsafeMake(parts.clonedUrl) // It is OK to use unsafeMake here because the URL has been validated already.
      : undefined;
  Object.defineProperty(self, 'url', {
    value: url,
    enumerable: true,
    writable: false,
  });

  const redirected: Response.Response['redirected'] = parts.redirected;
  Object.defineProperty(self, 'redirected', {
    value: redirected,
    enumerable: true,
    writable: false,
  });

  const body: Response.Response['body'] = parts.clonedBody; // It is OK to keep the reference to the body because Blob is immutable.
  Object.defineProperty(self, 'body', {
    value: body,
    enumerable: false,
    writable: false,
  });

  return self;
}
