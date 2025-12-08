import { absurd } from 'effect';
import { isArray } from '../utils/isArray';
import { SearchParamValueInput } from './SearchParamValueInput';

/**
 * @internal Mutable intermediate representation of a Url.Url.
 */
export type SearchParamValueIntermediate = /* mutable */ string[] | undefined;

function normalizeValue(value: string | number | undefined): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number') {
    return Number.isNaN(value) ? undefined : value.toString();
  }

  return absurd(value);
}

/**
 * @internal
 */
export function inputToSearchParamValueIntermediate(
  input: SearchParamValueInput
): SearchParamValueIntermediate {
  if (input === undefined) {
    return undefined;
  }

  const result: string[] = [];

  if (isArray(input)) {
    for (const v of input) {
      const normalized = normalizeValue(v);

      if (normalized === undefined) {
        continue;
      }

      result.push(normalized);
    }
  } else {
    const normalized = normalizeValue(input);

    if (normalized !== undefined) {
      result.push(normalized);
    }
  }

  if (result.length === 0) {
    return undefined;
  }

  return result;
}
