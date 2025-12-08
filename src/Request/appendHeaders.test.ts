import { describe, expect, expectTypeOf, test } from 'vitest';
import * as Request from './index';

describe('Request.appendHeaders', () => {
  test('dual api', () => {
    const request = Request.unsafeMake({ url: 'https://example.com' });
    const headers = {
      'X-API-Version': 'v2',
      'X-Client-ID': 'webapp',
    };

    // Data-first form: appendHeaders(request, headers)
    const a = Request.appendHeaders(request, headers);

    // Data-last form: appendHeaders(headers)(request)
    const b = Request.appendHeaders(headers)(request);

    expect(a).toEqual(b);
    expectTypeOf(a).toEqualTypeOf(b);
  });
});
