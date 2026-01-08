import { unsafeMake } from '../Url';
import { Proto } from './Proto';
import type { Response } from './Response';
import type { ResponseIntermediate } from './ResponseIntermediate';

/**
 * @internal
 */
export function makeFromResponseIntermediate(parts: ResponseIntermediate): Response {
  const self = Object.create(Proto);

  const tag: Response['_tag'] = 'Response';
  Object.defineProperty(self, '_tag', {
    value: tag,
    enumerable: true,
    writable: false,
  });

  const headers: Response['headers'] = parts.clonedHeaders ?? new Map<never, never>();
  Object.defineProperty(self, 'headers', {
    value: headers,
    enumerable: true,
    writable: false,
  });

  const status: Response['status'] = parts.status;
  Object.defineProperty(self, 'status', {
    value: status,
    enumerable: true,
    writable: false,
  });

  const statusText: Response['statusText'] = parts.statusText;
  Object.defineProperty(self, 'statusText', {
    value: statusText,
    enumerable: true,
    writable: false,
  });

  const type: Response['type'] = parts.type;
  Object.defineProperty(self, 'type', {
    value: type,
    enumerable: true,
    writable: false,
  });

  const url: Response['url'] =
    parts.clonedUrl !== undefined
      ? unsafeMake(parts.clonedUrl) // It is OK to use unsafeMake here because the URL has been validated already.
      : undefined;
  Object.defineProperty(self, 'url', {
    value: url,
    enumerable: true,
    writable: false,
  });

  const redirected: Response['redirected'] = parts.redirected;
  Object.defineProperty(self, 'redirected', {
    value: redirected,
    enumerable: true,
    writable: false,
  });

  const body: Response['body'] = parts.clonedBody; // It is OK to keep the reference to the body because Blob is immutable.
  Object.defineProperty(self, 'body', {
    value: body,
    enumerable: false,
    writable: false,
  });

  return self;
}
