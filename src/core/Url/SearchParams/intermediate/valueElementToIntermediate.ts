import { absurd } from 'effect';
import type { ValueElement } from '../SearchParams.js';
import type { $ValueElement } from './$SearchParams.js';

/**
 * @internal Transforms a SearchParams.ValueElement to an intermediate representation.
 */
export function valueElementToIntermediate(value: ValueElement): $ValueElement | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number') {
    return Number.isNaN(value) ? undefined : value.toString(10);
  }

  if (typeof value === 'bigint') {
    return value.toString(10);
  }

  return absurd(value);
}
