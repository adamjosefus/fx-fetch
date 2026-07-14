import { absurd, Predicate } from 'effect';
import { isArray } from '../../../_utils/isArray.js';
import { isMap } from '../../../_utils/isMap.js';
import type { Input, Value } from '../Headers.js';
import type { $Headers } from './$Headers.js';

/**
 * Appends a header value (or list of values) under a lowercased key. Blank
 * (`null` / `undefined`) values and empty lists are skipped so they never create
 * a header with no values.
 */
function appendValue(intermediate: $Headers, key: string, value: Value): void {
  if (value === null || value === undefined) {
    return;
  }

  const values = isArray(value) ? value : [value];
  if (values.length === 0) {
    return;
  }

  const normalizedKey = key.toLowerCase();
  const list = intermediate.get(normalizedKey) ?? [];
  list.push(...values);

  intermediate.set(normalizedKey, list);
}

function inputEntriesToIntermediate(
  input: Iterable<readonly [key: string, value: Value]>
): $Headers {
  const intermediate: $Headers = new Map();

  for (const [key, value] of input) {
    appendValue(intermediate, key, value);
  }

  return intermediate;
}

function inputRecordToIntermediate(input: Readonly<Record<string, Value>>): $Headers {
  const intermediate: $Headers = new Map();

  for (const [key, value] of Object.entries(input)) {
    appendValue(intermediate, key, value);
  }

  return intermediate;
}

/**
 * Narrows to an iterable of `[key, value]` entries. Maps and arrays are also
 * iterable, so this must only be reached after they have been ruled out. The
 * object check is folded in so the negative branch narrows `Iterable` out of the
 * union.
 */
function isEntriesIterable(input: Input): input is Iterable<readonly [string, Value]> {
  return (
    Predicate.isObject(input) &&
    Symbol.iterator in input &&
    typeof (input as { readonly [Symbol.iterator]?: unknown })[Symbol.iterator] === 'function'
  );
}

/**
 * @internal Converts any Headers input to the intermediate representation
 * without keeping a reference to the input object.
 */
export function inputToIntermediate(input: Input): $Headers {
  if (isMap(input)) {
    return inputEntriesToIntermediate(input);
  }

  if (isArray(input)) {
    return inputEntriesToIntermediate(input);
  }

  if (isEntriesIterable(input)) {
    return inputEntriesToIntermediate(input);
  }

  if (Predicate.isObject(input)) {
    return inputRecordToIntermediate(input);
  }

  return absurd(input);
}
