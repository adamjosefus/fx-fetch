import { describe, expect, expectTypeOf, test } from 'vitest';
import * as Url from './index';

describe('Url.deleteSearchParam', () => {
  test('dual api without value (deletes all)', () => {
    const url = Url.unsafeMake('https://example.com?page=1&limit=10');
    const key = 'page';

    // Data-first form: deleteSearchParam(url, key)
    const a = Url.deleteSearchParam(url, key);

    // Data-last form: deleteSearchParam(key)(url)
    const b = Url.deleteSearchParam(key)(url);

    expect(a).toEqual(b);
    expect(Url.format(a)).toBe('https://example.com?limit=10');
    expectTypeOf(a).toEqualTypeOf(b);
  });

  test('dual api with value (deletes specific)', () => {
    const url = Url.unsafeMake('https://example.com?tag=new&tag=sale&tag=active');
    const key = 'tag';
    const value = 'sale';

    // Data-first form: deleteSearchParam(url, key, value)
    const a = Url.deleteSearchParam(url, key, value);

    // Data-last form: deleteSearchParam(key, value)(url)
    const b = Url.deleteSearchParam(key, value)(url);

    expect(a).toEqual(b);
    expect(Url.format(a)).toBe('https://example.com?tag=new&tag=active');
    expectTypeOf(a).toEqualTypeOf(b);
  });
});
