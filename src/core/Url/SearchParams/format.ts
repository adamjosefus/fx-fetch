import type { SearchParams } from './SearchParams.js';

/** Matches every `%20` (a percent-encoded space) in a string (global). */
const encodedSpacePattern = /%20/g;

function encodeComponent(value: string): string {
  // `encodeURIComponent` escapes a space as `%20`, but the
  // `application/x-www-form-urlencoded` serialization encodes it as `+`.
  return globalThis.encodeURIComponent(value).replace(encodedSpacePattern, '+');
}

/**
 * @category Conversions
 * @since 2.0.0
 */
export function format(searchParams: SearchParams): string {
  const builder: /* mutable */ string[] = [];

  for (const [key, values] of searchParams) {
    const encodedKey = encodeComponent(key);

    for (const value of values) {
      const encodedValue = encodeComponent(value);

      builder.push(`${encodedKey}=${encodedValue}`);
    }
  }

  return builder.join('&');
}
