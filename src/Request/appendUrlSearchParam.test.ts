import { describe, expect, expectTypeOf, test } from 'vitest';
import * as Request from './index';

describe('Request.appendUrlSearchParam', () => {
  test('dual api', () => {
    const request = Request.unsafeMake({
      url: 'https://api.example.com?existing=value',
      method: 'GET',
    });

    const key = 'page';
    const value = '2';

    // Data-first form: appendUrlSearchParam(request, key, value)
    const a = Request.appendUrlSearchParam(request, key, value);

    // Data-last form: appendUrlSearchParam(key, value)(request)
    const b = Request.appendUrlSearchParam(key, value)(request);

    expect(a).toEqual(b);
    expectTypeOf(a).toEqualTypeOf(b);
  });
});
