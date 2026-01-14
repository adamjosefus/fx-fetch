import { describe, expect, expectTypeOf, test } from 'vitest';
import * as Response from './index';

describe('Response.getHeader', () => {
  test('dual api', () => {
    const response = Response.unsafeMake({
      ok: true,
      status: 200,
      statusText: '200 OK',
      type: 'default',
      url: 'https://example.com',
      headers: { Authorization: 'Bearer token' },
    });

    // Data-first form: getHeader(response, name)
    const a = Response.getHeader(response, 'Authorization');

    // Data-last form: getHeader(name)(response)
    const b = Response.getHeader('Authorization')(response);

    expect(a).toEqual(b);
    expectTypeOf(a).toEqualTypeOf(b);
  });
});
