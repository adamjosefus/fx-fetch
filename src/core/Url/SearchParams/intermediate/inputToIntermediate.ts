import { absurd, Predicate } from 'effect';
import { isArray } from '../../../_utils/isArray.js';
import { isMap } from '../../../_utils/isMap.js';
import type { Input, Value } from '../SearchParams.js';
import { parse } from '../utils/parse.js';
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
 * Narrows to an iterable of `[key, value]` entries. Maps and arrays are also
 * iterable, so this must only be reached after they have been ruled out.
 */
function isEntriesIterable(input: object): input is Iterable<readonly [string, Value]> {
  return (
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

export function inputToIntermediate(input: Input<never>): $SearchParams {
  if (isMap(input)) {
    return inputMapToIntermediate(input);
  }

  if (isArray(input)) {
    return inputEntriesToIntermediate(input);
  }

  if (typeof input === 'string') {
    return parse(input);
  }

  // A non-Map, non-Array iterable of `[key, value]` pairs — e.g. the
  // `URLSearchParams.entries()` iterator the browser adapter passes through.
  // Checked before the plain-record branch, since an iterator is also an object.
  if (Predicate.isObject(input) && isEntriesIterable(input)) {
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
