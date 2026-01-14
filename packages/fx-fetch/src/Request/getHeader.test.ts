import { describe, expect, expectTypeOf, test } from 'vitest';
import * as Request from './index';

describe('Request.getHeader', () => {
  test('dual api', () => {
    const request = Request.unsafeMake({
      url: 'https://example.com',
      headers: { Authorization: 'Bearer token' },
    });

    // Data-first form: getHeader(request, name)
    const a = Request.getHeader(request, 'Authorization');

    // Data-last form: getHeader(name)(request)
    const b = Request.getHeader('Authorization')(request);

    expect(a).toEqual(b);
    expectTypeOf(a).toEqualTypeOf(b);
  });
});
