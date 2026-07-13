import { describe, expect, test } from 'vitest';
import { parse } from './parse.js';

describe('SearchParams.parse', () => {
  test('empty string yields an empty map', () => {
    expect(parse('')).toEqual(new Map());
  });

  test('a lone "?" yields an empty map', () => {
    expect(parse('?')).toEqual(new Map());
  });

  test('parses key=value pairs', () => {
    expect(parse('a=1&b=2')).toEqual(
      new Map([
        ['a', ['1']],
        ['b', ['2']],
      ])
    );
  });

  test('duplicate keys accumulate their values in order', () => {
    expect(parse('q=first&q=second&q=third')).toEqual(
      new Map([['q', ['first', 'second', 'third']]])
    );
  });

  test('a segment without "=" becomes a key with an empty value', () => {
    expect(parse('flag')).toEqual(new Map([['flag', ['']]]));
  });

  test('a trailing "=" yields an empty value', () => {
    expect(parse('a=')).toEqual(new Map([['a', ['']]]));
  });

  test('an empty key is preserved', () => {
    expect(parse('=value')).toEqual(new Map([['', ['value']]]));
  });

  test('"+" decodes to a space (form-urlencoded)', () => {
    expect(parse('q=hello+world')).toEqual(new Map([['q', ['hello world']]]));
  });

  test('percent-escapes are decoded in keys and values', () => {
    expect(parse('a%20b=c%3Dd')).toEqual(new Map([['a b', ['c=d']]]));
  });

  test('only the first "=" splits key from value', () => {
    expect(parse('eq=a=b=c')).toEqual(new Map([['eq', ['a=b=c']]]));
  });

  test('malformed percent-escapes are kept raw (tolerant decoding)', () => {
    expect(parse('bad=100%')).toEqual(new Map([['bad', ['100%']]]));
  });

  test('a single leading "?" is stripped', () => {
    expect(parse('?a=1')).toEqual(new Map([['a', ['1']]]));
  });

  test('empty segments between "&" are skipped', () => {
    expect(parse('a=1&&b=2&')).toEqual(
      new Map([
        ['a', ['1']],
        ['b', ['2']],
      ])
    );
  });

  test('parses a full query, grouping duplicate keys', () => {
    expect(parse('q=hello+world&q=again&empty')).toEqual(
      new Map([
        ['q', ['hello world', 'again']],
        ['empty', ['']],
      ])
    );
  });
});
