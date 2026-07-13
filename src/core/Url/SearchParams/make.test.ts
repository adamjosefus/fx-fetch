/// <reference lib="dom" />

import { describe, expect, test } from 'vitest';
import { make } from './make.js';

describe('Url.SearchParams.make (string / query-string input)', () => {
  test('empty string yields no params', () => {
    expect(make('')).toEqual(new Map());
  });

  test('parses key=value pairs', () => {
    expect(make('a=1&b=2')).toEqual(
      new Map([
        ['a', ['1']],
        ['b', ['2']],
      ])
    );
  });

  test('duplicate keys accumulate their values', () => {
    expect(make('q=first&q=second')).toEqual(new Map([['q', ['first', 'second']]]));
  });

  test('a segment without "=" becomes a key with an empty value', () => {
    expect(make('flag')).toEqual(new Map([['flag', ['']]]));
  });

  test('"+" decodes to a space (form-urlencoded)', () => {
    expect(make('q=hello+world')).toEqual(new Map([['q', ['hello world']]]));
  });

  test('percent-escapes are decoded in keys and values', () => {
    expect(make('a%20b=c%3Dd')).toEqual(new Map([['a b', ['c=d']]]));
  });

  test('malformed percent-escapes are kept raw (tolerant decoding)', () => {
    expect(make('bad=100%')).toEqual(new Map([['bad', ['100%']]]));
  });

  test('a single leading "?" is stripped', () => {
    expect(make('?a=1')).toEqual(new Map([['a', ['1']]]));
  });

  test('empty segments between "&" are skipped', () => {
    expect(make('a=1&&b=2')).toEqual(
      new Map([
        ['a', ['1']],
        ['b', ['2']],
      ])
    );
  });

  test('matches the whole grouped shape parsed from a URL query', () => {
    expect(make('q=hello+world&q=again&empty')).toEqual(
      new Map([
        ['q', ['hello world', 'again']],
        ['empty', ['']],
      ])
    );
  });
});
