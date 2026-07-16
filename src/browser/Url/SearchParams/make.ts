import { pipe } from 'effect';
import { inputToIntermediate } from './intermediate/inputToIntermediate.js';
import { searchParamsFromIntermediate } from './intermediate/searchParamsFromIntermediate.js';
import type { Input, SearchParams } from './SearchParams.js';

/**
 * @category Constructors
 * @since 2.0.0
 */
export function make(input: Input): SearchParams {
  return pipe(input, inputToIntermediate, searchParamsFromIntermediate);
}
