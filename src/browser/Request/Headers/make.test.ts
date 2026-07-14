import { describe, expect, test } from 'vitest';
import { make } from './make.js';

describe('Request.Headers.make', () => {
  test('empty input yields an empty map', () => {
    expect(make({})).toEqual(new Map());
  });

  test('a record is converted, keys lowercased', () => {
    expect(make({ 'Content-Type': 'application/json', 'X-A': '1' })).toEqual(
      new Map([
        ['content-type', ['application/json']],
        ['x-a', ['1']],
      ])
    );
  });

  test('an array of pairs is accepted', () => {
    expect(
      make([
        ['Accept', 'text/html'],
        ['accept', 'application/json'],
      ])
    ).toEqual(new Map([['accept', ['text/html', 'application/json']]]));
  });

  test('a ReadonlyMap is accepted', () => {
    const input = new Map([['X-A', '1']]);

    expect(make(input)).toEqual(new Map([['x-a', ['1']]]));
  });

  test('an array value expands to repeated header values', () => {
    expect(make({ 'Set-Cookie': ['a=1', 'b=2'] })).toEqual(
      new Map([['set-cookie', ['a=1', 'b=2']]])
    );
  });

  test('null and undefined values are skipped', () => {
    expect(make({ a: '1', b: null, c: undefined })).toEqual(new Map([['a', ['1']]]));
  });

  test('an empty array value creates no header', () => {
    expect(make({ a: [] })).toEqual(new Map());
  });

  test('duplicate keys (differing case) accumulate their values', () => {
    expect(
      make([
        ['X-A', '1'],
        ['x-a', '2'],
      ])
    ).toEqual(new Map([['x-a', ['1', '2']]]));
  });
});
