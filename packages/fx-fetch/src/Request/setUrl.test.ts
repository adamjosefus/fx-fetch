import { Option } from 'effect';
import { describe, expect, expectTypeOf, test } from 'vitest';
import * as Request from './index';

describe('Request.setUrl', () => {
  test('dual api', () => {
    const request = Request.unsafeMake({ url: 'https://example.com' });
    const newUrl = 'https://api.newdomain.com';

    // Data-first form: setUrl(request, url)
    const a = Request.setUrl(request, newUrl);

    // Data-last form: setUrl(url)(request)
    const b = Request.setUrl(newUrl)(request);

    expect(a).toEqual(b);
    expectTypeOf(a).toEqualTypeOf(b);
    expect(Option.isSome(a)).toBe(true);
  });
});
