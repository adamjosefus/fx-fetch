import { Headers } from './Headers';

/**
 * @internal Converts a Headers instance to a global Headers instance.
 */
export function headersToJsHeaders(headers: Headers): globalThis.Headers {
  const jsHeaders = new globalThis.Headers();

  for (const [key, values] of headers) {
    for (const value of values) {
      jsHeaders.append(key, value);
    }
  }

  return jsHeaders;
}
