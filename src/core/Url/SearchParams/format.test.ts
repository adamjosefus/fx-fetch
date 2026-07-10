/// <reference lib="dom" />

import { describe, expect, test } from 'vitest';
import { format } from './format.js';
import { make } from './make.js';

function formatByReference(input: readonly (readonly unknown[])[]): string {
  return new globalThis.URLSearchParams(Object.fromEntries(input)).toString();
}

describe('Url.SearchParams.format', () => {
  test('no params', () => {
    const input = [] as const;

    const formatted = format(make(input));
    const expected = formatByReference(input);

    expect(formatted).toBe(expected);
  });

  test('single param', () => {
    const input = [
      ['name', 'John'],
      ['age', 30],
      ['const', 123n],
    ] as const;

    const formatted = format(make(input));
    const expected = formatByReference(input);

    expect(formatted).toBe(expected);
  });

  test('multiple params with same name', () => {
    const input = [
      ['param', 'first'],
      ['param', 'second'],
      ['another', 'value'],
      ['param', 'third'],
    ] as const;

    const formatted = format(make(input));
    const expected = formatByReference(input);

    expect(formatted).toBe(expected);
  });

  test('params with special characters', () => {
    const input = [
      ['name', 'John Doe'],
      ['city', 'New York'],
      ['query', 'a+b=c&d=e'],
      ['special', 'äöüß'],
      ['ruby', 'こんにちは'],
      ['emoji', '😀'],
      ['r-caron', 'ř'],
      ['r-acute', 'ŕ'],
      ['s-caron', 'š'],
      ['s-acute', 'ś'],
      ['t-caron', 'ť'],
      ['z-caron', 'ž'],
      ['z-acute', 'ź'],
    ] as const;

    const formatted = format(make(input));
    const expected = formatByReference(input);

    expect(formatted).toBe(expected);
  });
});
