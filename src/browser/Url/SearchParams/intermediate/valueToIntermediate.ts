import { isArray } from '../../../_utils/isArray.js';
import type { Value } from '../SearchParams.js';
import type { $Value, $ValueElement } from './$SearchParams.js';
import { valueElementToIntermediate } from './valueElementToIntermediate.js';

/**
 * @internal Transforms a SearchParams.Value to an intermediate representation.
 */
export function valueToIntermediate(value: Value): $Value | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (isArray(value)) {
    const acc: /* mutable */ $ValueElement[] = [];

    for (const valueElement of value) {
      const normalized = valueElementToIntermediate(valueElement);
      if (normalized === undefined) {
        continue;
      }

      acc.push(normalized);
    }

    return acc;
  }

  const acc: /* mutable */ $ValueElement[] = [];
  const normalized = valueElementToIntermediate(value);
  if (normalized !== undefined) {
    acc.push(normalized);
  }

  if (acc.length === 0) {
    return undefined;
  }

  return acc;
}
