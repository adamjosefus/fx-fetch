import { describe, expect, expectTypeOf, test } from 'vitest';
import * as Url from './index';

describe('Url.setSearchParams', () => {
  test('dual api', () => {
    const url = Url.unsafeMake('https://example.com');
    const params = { page: '1', limit: '10' };

    // Data-first form: setSearchParams(url, params)
    const a = Url.setSearchParams(url, params);

    // Data-last form: setSearchParams(params)(url)
    const b = Url.setSearchParams(params)(url);

    expect(a).toEqual(b);
    expectTypeOf(a).toEqualTypeOf(b);
  });
});
