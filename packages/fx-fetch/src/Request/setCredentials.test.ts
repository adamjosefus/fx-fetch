import { describe, expect, expectTypeOf, test } from 'vitest';
import * as Request from './index';

describe('Request.setCredentials', () => {
  test('dual api', () => {
    const request = Request.unsafeMake({
      url: 'https://api.example.com',
      method: 'GET',
    });

    const credentials = 'include' as const;

    // Data-first form: setCredentials(request, credentials)
    const a = Request.setCredentials(request, credentials);

    // Data-last form: setCredentials(credentials)(request)
    const b = Request.setCredentials(credentials)(request);

    expect(a).toEqual(b);
    expectTypeOf(a).toEqualTypeOf(b);

    // Verify the credentials were set
    expect(Request.getCredentials(a)).toBe('include');
  });
});
