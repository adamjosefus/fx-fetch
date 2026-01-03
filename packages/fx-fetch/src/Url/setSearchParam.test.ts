import { describe, expect, expectTypeOf, test } from 'vitest';
import * as Url from './index';

describe('Url.setSearchParam', () => {
  test('dual api', () => {
    const url = Url.unsafeMake('https://example.com?page=1&limit=10');
    const key = 'page';
    const value = '2';

    // Dual API: Data-first
    const a = Url.setSearchParam(url, key, value);

    // Dual API: Data-last
    const b = Url.setSearchParam(key, value)(url);

    expect(a).toEqual(b);
    expectTypeOf(a).toEqualTypeOf(b);
  });

  test('sets a single search parameter', () => {
    const url = Url.unsafeMake('https://example.com').pipe(
      Url.setSearchParam('key1', 'value1'),
      Url.setSearchParam('key2', 'value2'),
      Url.setSearchParam('key3', 'value3'),
      Url.setSearchParam('key4', 123),
      Url.setSearchParam('key1', 'newValue1'),
      Url.setSearchParam('key2', undefined)
    );

    expect(Url.format(url)).toBe('https://example.com?key1=newValue1&key3=value3&key4=123');
  });

  test('removes the parameter when value is undefined', () => {
    const url = Url.unsafeMake('https://example.com?key1=value1&key2=value2');

    const updatedUrl = Url.setSearchParam(url, 'key1', undefined);

    expect(Url.format(updatedUrl)).toBe('https://example.com?key2=value2');
  });
});
