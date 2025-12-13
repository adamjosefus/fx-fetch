import { describe, expect, expectTypeOf, test } from 'vitest';
import * as Request from './index';
import { setHeaders } from './setHeaders';

describe('Request.setHeaders', () => {
  test('dual api', () => {
    const request = Request.unsafeMake({ url: 'https://example.com' });
    const headers = {
      Authorization: 'Bearer token',
      'Content-Type': 'application/json',
    };

    // Data-first form: setHeaders(request, headers)
    const a = setHeaders(request, headers);

    // Data-last form: setHeaders(headers)(request)
    const b = setHeaders(headers)(request);

    expect(a).toEqual(b);
    expectTypeOf(a).toEqualTypeOf(b);
  });
});
