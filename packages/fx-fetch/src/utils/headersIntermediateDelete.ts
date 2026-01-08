import type { HeadersIntermediate } from './HeadersIntermediate';
import { toLowercase } from './toLowercase';

/**
 * @internal  Deletes headers from a `HeadersIntermediate` map.
 * If only the name is provided, all headers with that name are deleted.
 *
 * **⚠️ Warning:** This function mutates the provided `HeadersIntermediate` instance.
 */

export function headersIntermediateDelete(
  self: HeadersIntermediate,
  name: string,
  value?: string
): HeadersIntermediate {
  const normalizedName = toLowercase(name);

  if (value === undefined) {
    // Delete all headers with the given name
    self.delete(normalizedName);
  } else {
    // Delete only headers with the given name and value
    const prevList = self.get(normalizedName) ?? [];
    const nextList = prevList.filter((v) => v !== value); // Remove all occurrences of the value

    if (nextList.length === 0) {
      // If the list is empty, remove the header entirely
      self.delete(normalizedName);
    } else {
      // Otherwise, update the header with the new list
      self.set(normalizedName, nextList);
    }
  }

  return self;
}
