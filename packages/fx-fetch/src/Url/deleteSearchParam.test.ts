import { describe, expect, expectTypeOf, test } from 'vitest';
import * as Url from './index';

describe('Url.deleteSearchParam', () => {
  test('dual api', () => {
    const url = Url.unsafeMake('https://example.com?page=1&limit=10');
    const key = 'page';

    // Dual API: Data-first
    const a = Url.deleteSearchParam(url, key, undefined);

    // Dual API: Data-last
    const b = Url.deleteSearchParam(key, undefined)(url);

    expect(a).toEqual(b);
    expectTypeOf(a).toEqualTypeOf(b);
  });

  test('deletes all values for a given key when no value is provided', () => {
    const url = Url.unsafeMake('https://example.com?tag=new&tag=sale&tag=active');
    const updatedUrl = Url.deleteSearchParam(url, 'tag', undefined);

    expect(Url.format(updatedUrl)).toBe('https://example.com');
  });

  test('deletes only the specified value for a given key', () => {
    const url = Url.unsafeMake('https://example.com?tag=new&tag=sale&tag=active');
    const updatedUrl = Url.deleteSearchParam(url, 'tag', 'sale');

    expect(Url.format(updatedUrl)).toBe('https://example.com?tag=new&tag=active');
  });
});
