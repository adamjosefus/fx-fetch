import { describe, expect, expectTypeOf, test } from 'vitest';
import * as Request from './index';

describe('Request.deleteHeader', () => {
  test('dual api', () => {
    const request = Request.unsafeMake({
      url: 'https://example.com',
      headers: { Authorization: 'Bearer token' },
    });
    const headerName = 'Authorization';

    // Data-first form: deleteHeader(request, name)
    const a = Request.deleteHeader(request, headerName);

    // Data-last form: deleteHeader(name)(request)
    const b = Request.deleteHeader(headerName)(request);

    expect(a).toEqual(b);
    expectTypeOf(a).toEqualTypeOf(b);
  });
});
