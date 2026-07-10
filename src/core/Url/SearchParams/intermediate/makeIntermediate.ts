import { absurd } from 'effect';
import { isArray } from '../../../_utils/isArray.js';
import { isMap } from '../../../_utils/isMap.js';
import type { Input, SearchParams, Value } from '../SearchParams.js';
import type { $SearchParams } from './$SearchParams.js';
import { valueToIntermediate } from './valueToIntermediate.js';

function makeIntermediateFromMap(input: ReadonlyMap<string, Value>): $SearchParams {
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

function makeIntermediateFromArray(
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

function makeIntermediateFromRecord(input: { readonly [key: string]: Value }): $SearchParams {
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

export function makeIntermediate(input: Input<never>): $SearchParams {
  if (isMap(input)) {
    return makeIntermediateFromMap(input);
  }

  if (isArray(input)) {
    return makeIntermediateFromArray(input);
  }

  if (typeof input === 'object' && input !== null) {
    return makeIntermediateFromRecord(input);
  }

  return absurd(input);
}
