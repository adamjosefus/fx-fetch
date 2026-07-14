import type { Headers } from '../Headers.js';
import type { $Headers } from './$Headers.js';

/**
 * @internal Makes an intermediate Headers from immutable Headers.
 */
export function headersToIntermediate(headers: Headers): $Headers {
  const intermediate: $Headers = new Map();

  for (const [key, values] of headers) {
    intermediate.set(key, [...values]);
  }

  return intermediate;
}
