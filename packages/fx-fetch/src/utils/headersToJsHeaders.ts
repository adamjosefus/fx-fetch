import type { Headers } from './Headers';
import type * as localThis from './localThis';

/**
 * @internal Converts a Headers instance to a global Headers instance.
 */
export function headersToJsHeaders(headers: Headers): localThis.Headers {
  const jsHeaders = new globalThis.Headers();

  for (const [key, values] of headers) {
    for (const value of values) {
      jsHeaders.append(key, value);
    }
  }

  return jsHeaders;
}
