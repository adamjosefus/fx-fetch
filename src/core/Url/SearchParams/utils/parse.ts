import { safeDecode } from '../../../_utils/safeDecode.js';
import type { $SearchParams } from '../intermediate/$SearchParams.js';

/** Matches every `+` in a string (global), used to turn `+` back into a space. */
const plusSignPattern = /\+/g;

/**
 * Decodes an `application/x-www-form-urlencoded` component, where `+` denotes a
 * space. This mirrors the encoding used by `SearchParams.format`.
 */
function decodeFormComponent(value: string): string {
  return safeDecode(value.replace(plusSignPattern, ' '));
}

/**
 * Parses a `key=value&...` query string into its raw parts (the intermediate
 * `Map<string, string[]>`). A single leading `?` is stripped (matching the
 * WHATWG `URLSearchParams` constructor). Keys and values are
 * form-urlencoded-decoded (`+` → space); a segment without `=` becomes a key
 * with an empty value, and duplicate keys accumulate their values.
 *
 * This is the `SearchParams` counterpart to `Url`'s `parse`: `Url.parse` splits
 * the URL structure and returns the query string raw, and this owns turning that
 * string into parameters.
 *
 * @internal
 */
export function parse(search: string): $SearchParams {
  const intermediate: $SearchParams = new Map();

  const rest = search.startsWith('?') ? search.slice(1) : search;
  if (rest === '') {
    return intermediate;
  }

  for (const part of rest.split('&')) {
    if (part === '') {
      continue;
    }

    const separator = part.indexOf('=');
    const key = decodeFormComponent(separator === -1 ? part : part.slice(0, separator));
    const value = separator === -1 ? '' : decodeFormComponent(part.slice(separator + 1));

    const list = intermediate.get(key) ?? [];
    list.push(value);

    intermediate.set(key, list);
  }

  return intermediate;
}
