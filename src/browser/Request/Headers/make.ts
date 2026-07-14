import { pipe } from 'effect';
import type { Headers, Input } from './Headers.js';
import { headersFromIntermediate } from './intermediate/headersFromIntermediate.js';
import { inputToIntermediate } from './intermediate/inputToIntermediate.js';

/**
 * Creates immutable Headers from any accepted input.
 *
 * @category Constructors
 * @since 0.1.0
 */
export function make(input: Input): Headers {
  return pipe(input, inputToIntermediate, headersFromIntermediate);
}
