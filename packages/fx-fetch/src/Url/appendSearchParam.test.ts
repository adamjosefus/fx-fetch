import { describe, expect, expectTypeOf, test } from 'vitest';
import * as Url from './index';

describe('Url.appendSearchParam', () => {
  test('dual api', () => {
    const url = Url.unsafeMake('https://api.example.com?existing=value');
    const key = 'page';
    const value = '1';

    // Data-first form: appendSearchParam(url, key, value)
    const a = Url.appendSearchParam(url, key, value);

    // Data-last form: appendSearchParam(key, value)(url)
    const b = Url.appendSearchParam(key, value)(url);

    expect(a).toEqual(b);
    expectTypeOf(a).toEqualTypeOf(b);

    // Verify the parameter was appended
    const jsUrl = Url.toJsUrl(a);
    expect(jsUrl.searchParams.get('page')).toBe('1');
    expect(jsUrl.searchParams.get('existing')).toBe('value');
  });
});
