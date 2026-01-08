import type { HeadersIntermediate } from './HeadersIntermediate';

/**
 * @internal Clears all headers from the given HeadersIntermediate.
 *
 * **⚠️ Warning:** This function mutates the provided `HeadersIntermediate` instance.
 */
export function headersIntermediateClear(self: HeadersIntermediate): HeadersIntermediate {
  self.clear();

  return self;
}
