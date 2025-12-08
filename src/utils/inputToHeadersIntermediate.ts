import { HeadersInput } from './HeadersInput';
import { HeadersIntermediate } from './HeadersIntermediate';
import { isArray } from './isArray';
import { isMap } from './isMap';
import { Lowercase } from './Lowercase';
import { objectEntries } from './objectEntries';
import { toLowercase } from './toLowercase';

/**
 * @internal Safe conversion from HeadersInput to HeadersIntermediate
 * without keeping references to the input object.
 */
export function inputToHeadersIntermediate(input: HeadersInput): HeadersIntermediate {
  if (input === undefined) {
    return new Map<never, never>();
  }

  // Handle Headers instance
  if (input instanceof Headers) {
    const headers = new Map<Lowercase, string[]>();
    for (const [key, value] of input) {
      const normalizedKey = toLowercase(key);
      const list = headers.get(normalizedKey) ?? [];

      list.push(value);

      headers.set(normalizedKey, list);
    }
    return headers;
  }

  // Handle [string, string][] instance
  if (isArray(input)) {
    const headers = new Map<Lowercase, string[]>();
    for (const [key, valueOrValues] of input) {
      if (valueOrValues === null || valueOrValues === undefined) {
        continue; // Skip blank values
      }

      const normalizedKey = toLowercase(key);
      const list = headers.get(normalizedKey) ?? [];

      if (isArray(valueOrValues)) {
        const values = valueOrValues;
        list.push(...values);
      } else {
        const value = valueOrValues;
        list.push(value);
      }

      headers.set(normalizedKey, list);
    }
    return headers;
  }

  // Handle Map instance
  if (isMap(input)) {
    const headers = new Map<Lowercase, string[]>();
    for (const [key, valueOrValues] of input) {
      if (valueOrValues === null || valueOrValues === undefined) {
        continue; // Skip blank values
      }

      const normalizedKey = toLowercase(key);
      const list = headers.get(normalizedKey) ?? [];

      if (isArray(valueOrValues)) {
        const values = valueOrValues;
        list.push(...values);
      } else {
        const value = valueOrValues;
        list.push(value);
      }

      headers.set(normalizedKey, list);
    }
    return headers;
  }

  // Handle Iterable instance
  if (Symbol.iterator in input) {
    const headers = new Map<Lowercase, string[]>();
    for (const [key, valueOrValues] of input) {
      if (valueOrValues === null || valueOrValues === undefined) {
        continue; // Skip blank values
      }

      const normalizedKey = toLowercase(key);
      const list = headers.get(normalizedKey) ?? [];

      if (isArray(valueOrValues)) {
        const values = valueOrValues;
        list.push(...values);
      } else {
        const value = valueOrValues;
        list.push(value);
      }

      headers.set(normalizedKey, list);
    }
    return headers;
  }

  // Handle Record instance
  const headers = new Map<Lowercase, string[]>();
  for (const [key, valueOrValues] of objectEntries(input)) {
    if (valueOrValues === null || valueOrValues === undefined) {
      continue; // Skip blank values
    }

    const normalizedKey = toLowercase(key);
    const list = headers.get(normalizedKey) ?? [];

    if (isArray(valueOrValues)) {
      const values = valueOrValues;
      list.push(...values);
    } else {
      const value = valueOrValues;
      list.push(value);
    }

    headers.set(normalizedKey, list);
  }

  return headers;
}
