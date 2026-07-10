import type { SearchParams } from '../SearchParams.js';
import type { $SearchParams } from './$SearchParams.js';

export function searchParamsToIntermediate(searchParams: SearchParams): $SearchParams {
  const intermediate: $SearchParams = new Map();

  for (const [key, values] of searchParams) {
    intermediate.set(key, [...values]);
  }

  return intermediate;
}
