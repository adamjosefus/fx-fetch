import { describe, expect, expectTypeOf, test } from 'vitest';
import * as Url from './index';

describe('Url.deleteSearchParam', () => {
  test('dual api', () => {
    const url = Url.unsafeMake('https://example.com?page=1&limit=10');
    const key = 'page';

    // Data-first form: deleteSearchParam(url, key)
    const a = Url.deleteSearchParam(url, key);

    // Data-last form: deleteSearchParam(key)(url)
    const b = Url.deleteSearchParam(key)(url);

    expect(a).toEqual(b);
    expectTypeOf(a).toEqualTypeOf(b);
  });
});
