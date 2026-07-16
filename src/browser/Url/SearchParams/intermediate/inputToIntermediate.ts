import { absurd, Predicate } from 'effect';
import { isArray } from '../../../_utils/isArray.js';
import { isMap } from '../../../_utils/isMap.js';
import type { Input, Value } from '../SearchParams.js';
import type { $SearchParams } from './$SearchParams.js';
import { valueToIntermediate } from './valueToIntermediate.js';

function inputMapToIntermediate(input: ReadonlyMap<string, Value>): $SearchParams {
  const intermediate: $SearchParams = new Map();

  for (const [key, value] of input) {
    const values = valueToIntermediate(value);
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
 * Narrows to an iterable of `[key, value]` entries. Maps, arrays and strings are
 * also iterable, so this must only be reached after they have been ruled out.
 * The object check is folded in (rather than a separate `&&` at the call site) so
 * the negative branch narrows `Iterable`/`MapIterator` out of the union.
 */
function isEntriesIterable(input: Input): input is Iterable<readonly [string, Value]> {
  return (
    Predicate.isObject(input) &&
    Symbol.iterator in input &&
    typeof (input as { readonly [Symbol.iterator]?: unknown })[Symbol.iterator] === 'function'
  );
}

function inputEntriesToIntermediate(
  input: Iterable<readonly [key: string, value: Value]>
): $SearchParams {
  const intermediate: $SearchParams = new Map();

  for (const [key, value] of input) {
    const values = valueToIntermediate(value);
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

function inputRecordToIntermediate(input: { readonly [key: string]: Value }): $SearchParams {
  const intermediate: $SearchParams = new Map();

  for (const [key, value] of Object.entries(input)) {
    const values = valueToIntermediate(value);
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

export function inputToIntermediate(input: Input): $SearchParams {
  if (input instanceof globalThis.URLSearchParams) {
    return inputEntriesToIntermediate(input.entries());
  }

  if (isMap(input)) {
    return inputMapToIntermediate(input);
  }

  if (isArray(input)) {
    return inputEntriesToIntermediate(input);
  }

  if (typeof input === 'string') {
    return inputEntriesToIntermediate(new globalThis.URLSearchParams(input).entries());
  }

  // A non-Map, non-Array iterable of `[key, value]` pairs.
  // Checked before the plain-record branch, since an iterator is also an object.
  if (isEntriesIterable(input)) {
    return inputEntriesToIntermediate(input);
  }

  if (Predicate.isObject(input)) {
    return inputRecordToIntermediate(input);
  }

  // TODO: `absurd` throws at runtime as a `never` exhaustiveness guard. Unlike the
  // `Url.make` path, `SearchParams.make` does not wrap this in `liftThrowable`, so a
  // caller that bypasses the types (a runtime boolean/symbol/etc.) gets an uncaught
  // throw. Investigate: return an error value or wrap the public entry point.
  return absurd(input);
}
