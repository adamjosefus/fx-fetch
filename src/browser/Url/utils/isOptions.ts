import { Predicate } from 'effect';
import type { Url } from '../Url.js';

// TODO: Add unit tests for this function

/**
 * @internal Guard to check if an input is a Url.Options.
 */
export function isOptions(input: unknown): input is Url.Options {
  return Predicate.isObject(input) && typeof input.url === 'string';
}
