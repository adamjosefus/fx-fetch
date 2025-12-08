import { HeadersInput } from './HeadersInput';
import { HeadersIntermediate } from './HeadersIntermediate';
import { inputToHeadersIntermediate } from './inputToHeadersIntermediate';

/**
 * @internal Appends headers to an existing `HeadersIntermediate` map. If a header already exists, the new values are appended to the existing ones.
 * If the resulting list of values for a header is empty, that header is removed from the map.
 *
 * **⚠️ Warning:** This function mutates the provided `HeadersIntermediate` instance.
 */
export function headersIntermediateAppend(
  self: HeadersIntermediate,
  headers: HeadersInput
): HeadersIntermediate {
  for (const [name, values] of inputToHeadersIntermediate(headers)) {
    const list = self.get(name) ?? [];
    list.push(...values); // Append new values

    if (list.length === 0) {
      // If the list is empty after appending, remove the header
      self.delete(name);
      continue;
    }

    self.set(name, list);
  }

  return self;
}
