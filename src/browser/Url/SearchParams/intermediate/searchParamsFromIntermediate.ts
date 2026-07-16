import type { SearchParams } from '../SearchParams.js';
import type { $SearchParams } from './$SearchParams.js';

export function searchParamsFromIntermediate(intermediate: $SearchParams): SearchParams {
  const searchParams = new Map<string, readonly string[]>();

  for (const [key, values] of intermediate) {
    searchParams.set(key, [...values]);
  }

  return searchParams;
}
