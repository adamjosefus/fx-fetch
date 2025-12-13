import { HeadersInput } from './HeadersInput';
import { HeadersIntermediate } from './HeadersIntermediate';
import { inputToHeadersIntermediate } from './inputToHeadersIntermediate';

/**
 * @internal Sets headers on an existing `HeadersIntermediate` map, replacing any existing headers.
 *
 * **⚠️ Warning:** This function mutates the provided `HeadersIntermediate` instance.
 */
export function headersIntermediateSet(
  self: HeadersIntermediate,
  headers: HeadersInput
): HeadersIntermediate {
  self.clear(); // Clear existing headers first

  for (const [key, values] of inputToHeadersIntermediate(headers)) {
    self.set(key, values); // Set new values
  }

  return self;
}
