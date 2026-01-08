import type { Headers } from './Headers';
import type { HeadersIntermediate } from './HeadersIntermediate';
import { Lowercase } from './Lowercase';

/**
 * @internal
 */
export function cloneHeadersIntermediate(headers: Headers | undefined): HeadersIntermediate {
  if (headers === undefined) {
    return new Map<never, never>();
  }

  const result = new Map<Lowercase, string[]>();
  for (const [key, values] of headers) {
    result.set(key, [...values]); // Clone the array to ensure mutability
  }

  return result;
}
