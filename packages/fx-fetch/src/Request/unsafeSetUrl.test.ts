import { describe, expect, expectTypeOf, test } from 'vitest';
import * as Request from './index';

describe('Request.unsafeSetUrl', () => {
  test('dual api', () => {
    const request = Request.unsafeMake({ url: 'https://example.com' });
    const newUrl = 'https://newdomain.com';

    // Data-first form: unsafeSetUrl(request, url)
    const a = Request.unsafeSetUrl(request, newUrl);

    // Data-last form: unsafeSetUrl(url)(request)
    const b = Request.unsafeSetUrl(newUrl)(request);

    expect(a).toEqual(b);
    expectTypeOf(a).toEqualTypeOf(b);
  });
});
