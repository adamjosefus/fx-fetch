/// <reference lib="dom" />

import { describe, expect, test } from 'vitest';
import { format } from './format.js';
import { make } from './make.js';

function formatByReference(input: readonly (readonly unknown[])[]): string {
  const jsSearchParams = new globalThis.URLSearchParams();

  for (const [key, value] of input) {
    jsSearchParams.append(String(key), String(value));
  }

  return jsSearchParams.toString();
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
      ['param', 'third'],
      ['another', 'value'],
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
      ['hash', '#fragment'],
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

  test('special characters in keys', () => {
    const input = [
      ['first name', 'John'],
      ['a&b', 'x'],
      ['a=b', 'y'],
      ['ř', 'z'],
    ] as const;

    const formatted = format(make(input));
    const expected = formatByReference(input);

    expect(formatted).toBe(expected);
  });

  test('empty key and empty value', () => {
    const input = [
      ['key', ''],
      ['', 'value'],
    ] as const;

    const formatted = format(make(input));
    const expected = formatByReference(input);

    expect(formatted).toBe(expected);
  });

  test('reserved characters as literal values', () => {
    const input = [
      ['percent', '100%'],
      ['equals', 'a=b'],
      ['amp', 'x&y'],
      ['plus', 'a+b'],
      ['space', 'a b'],
    ] as const;

    const formatted = format(make(input));
    const expected = formatByReference(input);

    expect(formatted).toBe(expected);
  });

  test('numeric and bigint values', () => {
    const input = [
      ['zero', 0],
      ['negative', -42],
      ['float', 1.5],
      ['big', 9007199254740993n],
    ] as const;

    const formatted = format(make(input));
    const expected = formatByReference(input);

    expect(formatted).toBe(expected);
  });

  test('array value expands to a repeated key', () => {
    const input = [
      ['tags', 'a'],
      ['tags', 'b'],
      ['tags', 'c'],
    ] as const;

    const formatted = format(make(input));
    const expected = formatByReference(input);

    expect(formatted).toBe(expected);
  });

  test('undefined and NaN values are omitted', () => {
    const input = [
      ['keep', 'yes'],
      ['skip-undefined', undefined],
      ['skip-nan', Number.NaN],
      ['also-keep', 'ok'],
    ] as const;

    const formatted = format(make(input));
    const expected = 'keep=yes&also-keep=ok';

    expect(formatted).toBe(expected);
  });
});
