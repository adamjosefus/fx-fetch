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

  // TODO: `absurd` throws at runtime as a `never` exhaustiveness guard. Reached if a
  // value element is a runtime type outside `string | bigint | number | undefined`.
  // The `SearchParams.make` path does not wrap this in `liftThrowable`, so it can
  // propagate uncaught. Investigate: return an error value or wrap the entry point.
  return absurd(value);
}
