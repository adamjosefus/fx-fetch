import { absurd } from 'effect';
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

function inputArrayToIntermediate(
  input: readonly (readonly [key: string, value: Value])[]
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
    return inputArrayToIntermediate(input);
  }

  if (typeof input === 'object' && input !== null) {
    return inputRecordToIntermediate(input);
  }

  // TODO: `absurd` throws at runtime as a `never` exhaustiveness guard. Unlike the
  // `Url.make` path, `SearchParams.make` does not wrap this in `liftThrowable`, so a
  // caller that bypasses the types (a runtime boolean/symbol/etc.) gets an uncaught
  // throw. Investigate: return an error value or wrap the public entry point.
  return absurd(input);
}
