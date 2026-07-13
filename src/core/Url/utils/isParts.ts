import { Predicate } from 'effect';
import type { Url } from '../Url.js';

// TODO: Add unit tests for this function

/**
 * @internal Guard to check if an input is a Url.Parts.
 */
export function isParts(input: unknown): input is Url.Parts<any> {
  return (
    Predicate.isObject(input) &&
    typeof input.hostname === 'string' &&
    typeof input.protocol === 'string'
  );
}
