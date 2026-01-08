import { pipe } from 'effect';
import type { Headers } from './Headers';
import { objectFromEntries } from './objectFromEntries';

/**
 * @internal Converts a Headers instance to a plain object.
 */
export function headersToHeadersRecord(headers: Headers) {
  return pipe(Array.from(headers.entries()), objectFromEntries);
}
