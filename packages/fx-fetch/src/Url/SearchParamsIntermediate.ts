import { isArray } from '../utils/isArray';
import { isJsUrlSearchParams } from '../utils/isJsUrlSearchParams';
import { isMap } from '../utils/isMap';
import type * as localThis from '../utils/localThis';
import { objectEntries } from '../utils/objectEntries';
import type { SearchParamsInput } from './SearchParamsInput';
import type { SearchParamValueInput } from './SearchParamValueInput';
import { inputToSearchParamValueIntermediate } from './SearchParamValueIntermediate';

/**
 * @internal Represents a mutable map of search parameters.
 */
export type SearchParamsIntermediate = /* mutable */ Map<string, /* mutable */ string[]>;

function normalizeSearchParamsString(queryString: string): string {
  return queryString.startsWith('?') ? queryString : `?${queryString}`;
}

function jsUrlSearchParamsToSearchParamsIntermediate(
  jsUrlSearchParams: localThis.URLSearchParams
): SearchParamsIntermediate {
  // Implementation here
  const intermediate = new Map<string, string[]>();

  for (const [key, value] of jsUrlSearchParams) {
    const list = intermediate.get(key) ?? [];
    list.push(value);

    intermediate.set(key, list);
  }

  return intermediate;
}

function stringToSearchParamsIntermediate(searchParamsString: string): SearchParamsIntermediate {
  // Implementation here
  const jsUrlSearchParams = new globalThis.URLSearchParams(
    normalizeSearchParamsString(searchParamsString)
  ); // `URLSearchParams` never throws
  return jsUrlSearchParamsToSearchParamsIntermediate(jsUrlSearchParams);
}

function mapToSearchParamsIntermediate(
  map: ReadonlyMap<string, SearchParamValueInput>
): SearchParamsIntermediate {
  const intermediate = new Map<string, string[]>();

  for (const [key, valueInput] of map) {
    const values = inputToSearchParamValueIntermediate(valueInput);
    if (values === undefined) {
      continue;
    }

    if (values.length === 0) {
      continue;
    }

    const list = intermediate.get(key) ?? [];
    list.push(...values);

    intermediate.set(key, list);
  }

  return intermediate;
}

function entriesToSearchParamsIntermediate(
  entries: readonly (readonly [key: string, value: SearchParamValueInput])[]
): SearchParamsIntermediate {
  const intermediate = new Map<string, string[]>();

  for (const [key, valueInput] of entries) {
    const values = inputToSearchParamValueIntermediate(valueInput);
    if (values === undefined) {
      continue;
    }

    if (values.length === 0) {
      continue;
    }

    const list = intermediate.get(key) ?? [];
    list.push(...values);

    intermediate.set(key, list);
  }

  return intermediate;
}

function recordToSearchParamsIntermediate(record: {
  readonly [key: string]: SearchParamValueInput;
}): SearchParamsIntermediate {
  const intermediate = new Map<string, string[]>();

  for (const [rawKey, valueInput] of objectEntries(record)) {
    const key = rawKey.toString();
    const values = inputToSearchParamValueIntermediate(valueInput);
    if (values === undefined) {
      continue;
    }

    if (values.length === 0) {
      continue;
    }

    const list = intermediate.get(key) ?? [];
    list.push(...values);

    intermediate.set(key, list);
  }

  return intermediate;
}

/**
 * @internal
 */
export function inputToSearchParamsIntermediate(
  input: SearchParamsInput | undefined
): SearchParamsIntermediate {
  // Blank input
  if (typeof input === 'undefined') {
    return new Map<never, never>(); // Return an empty Map if no search params are provided
  }

  // URLSearchParams string
  if (typeof input === 'string') {
    return stringToSearchParamsIntermediate(input);
  }

  // globalThis.URLSearchParams
  if (isJsUrlSearchParams(input)) {
    return jsUrlSearchParamsToSearchParamsIntermediate(input);
  }

  // Map<string, SearchParamValueInput>
  if (isMap(input)) {
    return mapToSearchParamsIntermediate(input);
  }

  // Entries
  if (isArray(input)) {
    return entriesToSearchParamsIntermediate(input);
  }

  const _check: Record<string, unknown> = input;

  // Record
  return recordToSearchParamsIntermediate(input);
}
