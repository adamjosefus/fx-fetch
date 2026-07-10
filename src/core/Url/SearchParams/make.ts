import { pipe } from 'effect';
import { inputToIntermediate } from './intermediate/inputToIntermediate.js';
import { searchParamsFromIntermediate } from './intermediate/searchParamsFromIntermediate.js';
import type { Input, SearchParams } from './SearchParams.js';

export function make(input: Input<never>): SearchParams {
  return pipe(input, inputToIntermediate, searchParamsFromIntermediate);
}
