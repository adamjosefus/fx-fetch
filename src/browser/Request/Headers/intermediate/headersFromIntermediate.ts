import type { Headers } from '../Headers.js';
import type { $Headers } from './$Headers.js';

/**
 * @internal Makes immutable Headers from an intermediate Headers.
 */
export function headersFromIntermediate(intermediate: $Headers): Headers {
  const headers = new Map<string, readonly string[]>();

  for (const [key, values] of intermediate) {
    headers.set(key, [...values]);
  }

  return headers;
}
