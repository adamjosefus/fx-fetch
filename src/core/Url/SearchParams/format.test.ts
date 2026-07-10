import { describe, expect, test } from 'vitest';
import { format } from './format.js';
import { make } from './make.js';

describe('Url.SearchParams.format', () => {
  test('no params', () => {
    const input = [] as const;

    const formatted = format(make(input));
    const expected = new globalThis.URLSearchParams(Object.fromEntries(input)).toString();

    expect(formatted).toBe(expected);
  });
});
